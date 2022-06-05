import { getRepository, ObjectID } from 'typeorm';
import user_view from '../views/users_view';

import User from '../infra/typeorm/entities/User';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import MiddleUtilities from '@config/utilities';
interface Request {
    name: string;
    email: string;
    password: string;
    type:number;
    phone: string;
    guard_id :string;
    house_number: string;
    street_name: string;
    tenants: number;
}

interface UserReturn {
    id: ObjectID,
    name: string,
    email: string,
    type:number,
    phone: string,
    guard_id :string,
    house_number: string, 
    street_name: string,
    tenants: number
}

class CreateUserService {
    public async execute({ name, type,email,phone,guard_id,house_number, street_name,tenants, password }: Request): Promise<UserReturn> {
        const usersRepository = getRepository(User);
        const hashProvider = new BCryptHashProvider();
        
        const hashedPassword = await hashProvider.generateHash(password);

        const user = usersRepository.create({  name, type,email,phone,guard_id,house_number, street_name,tenants, password: hashedPassword,visitations:0 });

        await usersRepository.save(user);

        const userFormatted = user_view.render(user);

        const middleUtilities= new MiddleUtilities();
        let apiKey=await middleUtilities.getSetting("sms_api_token");
        let number= phone;
        number=number.replace("+","");
        if(!number.startsWith('234')){
            number="234"+number;
        } 
        let app_name=await middleUtilities.getSetting("app_name");
        let app_url=await middleUtilities.getSetting("app_url");
        let message='Your have been registered as a landord on '+app_name+'. Logon to '+app_url+' with your registered email address ('+email+') and password ('+password+'). Alternatively, download the app from the app store (Iphone) or play store(Android).';
        let sender_id=await middleUtilities.getSetting("sms_sender_name");
        let smtp_name=await middleUtilities.getSetting("smtp_name");
        let smtp_email=await middleUtilities.getSetting("smtp_email");
        let smtp_password=await middleUtilities.getSetting("smtp_password");
        let sender_email=await middleUtilities.getSetting("sender_email");
        let sender_name=await middleUtilities.getSetting("sender_name");
        let sendgrid=await middleUtilities.getSetting("sendgrid_apiKey");
        let receiver_email=email;
        let subject=app_name+" New Account Information"

        middleUtilities.sendSMS(apiKey,number,message,sender_id);
        middleUtilities.sendEmail(smtp_name,smtp_email,smtp_password,sender_email,sender_name,receiver_email,name,message,subject)
       
       
        return userFormatted;
    }
}

export default CreateUserService;