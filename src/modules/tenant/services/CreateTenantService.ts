import { getRepository } from 'typeorm';

import Tenant from '../infra/typeorm/entities/Tenant';
import User from '../../../modules/user/infra/typeorm/entities/User';
import MiddleUtilities from '../../../config/utilities';

interface Request {
    name: string;
    landlord_id: string;
    apartment_description: string;
    phone: string;
    email:string;
    password:string;
}

class CreateTenantService {
    public async execute({ name, landlord_id, apartment_description, phone,email,password }: Request): Promise<Tenant> {
        const tenantsRepository = getRepository(Tenant);
        const usersRepository = getRepository(User);
        const middleUtilities= new MiddleUtilities();
        password=password?password:middleUtilities.generateString(6);

        const userExists = await usersRepository.findOne(landlord_id);

        if (!userExists) {
            throw new Error('User does not exists.');
        }

        const tenant = tenantsRepository.create({ name, landlord_id, apartment_description, phone,email,password, status:true,deleted:false,visitations:0 });

        if (!tenant) {
            throw new Error('Tenant count already is set.');
        }

        await tenantsRepository.save(tenant);
        
        userExists.tenants = userExists.tenants ? userExists.tenants += 1 : 1;

        await usersRepository.save(userExists);

 

        

        
        let apiKey=await middleUtilities.getSetting("sms_api_token");
        let number= phone;
        number=number.replace("+","");
        if(!number.startsWith('234')){
            number="234"+number;
        } 
        let app_name=await middleUtilities.getSetting("app_name");
        let app_url=await middleUtilities.getSetting("app_url");
        let message='Your have been registered as a tenant on '+app_name+'. Logon to '+app_url+' with your registered email address ('+email+') and password ('+password+'). Alternatively, download the app from the app store (Iphone) or play store(Android).';
        let sender_id=await middleUtilities.getSetting("sms_sender_name");
        let smtp_name=await middleUtilities.getSetting("smtp_name");
        let smtp_email=await middleUtilities.getSetting("smtp_email");
        let smtp_password=await middleUtilities.getSetting("smtp_password");
        let sender_email=await middleUtilities.getSetting("sender_email");
        let sender_name=await middleUtilities.getSetting("sender_name");
        let sendgrid=await middleUtilities.getSetting("sendgrid_apiKey");
        let receiver_email=email;
        let subject=app_name+" New Account Information"

       // middleUtilities.sendSMS(apiKey,number,message,sender_id);
        //middleUtilities.sendSendGridEmail(sendgrid,sender_email,sender_name,receiver_email,name,message,subject)
        middleUtilities.sendEmail(smtp_name,smtp_email,smtp_password,sender_email,sender_name,receiver_email,name,message,subject)
       
        
        return tenant;
    }
}

export default CreateTenantService;