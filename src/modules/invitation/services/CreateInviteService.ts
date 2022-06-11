import User from '@modules/user/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import { Creator } from '../infra/typeorm/entities/creator';
import Tenant from '@modules/tenant/infra/typeorm/entities/Tenant';
import Invitation from '../infra/typeorm/entities/Invitation';
import MiddleUtilities from '@config/utilities';
import moment from 'moment';
interface Request {
    creator_id:string,
    visitor_name: string;
    visitor_phone: string;
    visitor_email:string; 
    check_visitor:boolean;
    expiry_date:Date;
    multiple_entry_exit: boolean;
    no_of_people:number;
    imageName?:string;
    note?:string;
    visitor_code?:string;

    
}
 
class CreateInviteService {
    public async execute({  creator_id,visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,imageName,note,visitor_code  }: Request): Promise<Invitation> {
        const invitesRepository = getRepository(Invitation);
        const userRepository = getRepository(User);
        const tenantRepository = getRepository(Tenant);

        const userExists = await userRepository.findOne(creator_id);
        var  user;
        if (!userExists) {
            const tenant = await tenantRepository.findOne(creator_id);
            if(!tenant){
                throw new Error('User does not exist');
            }
            user= new Creator(tenant.id+"",tenant.name,tenant.email);
        }else{
            user= new Creator(userExists.id+"",userExists.name,userExists.email);

        }

       

        const invite = invitesRepository.create({  creator_id,visitor_name,visitor_phone, visitor_code,visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,visitor_image:imageName,note,creator: user,isActive:  true,traffic_count:0  });

        await invitesRepository.save(invite);
      
        var dateObj = new Date(expiry_date);
        var momentObj = moment(dateObj);
        var momentString = momentObj.format('MMMM Do YYYY, hh:mm a'); 
        
        const middleUtilities= new MiddleUtilities();
        let apiKey=await middleUtilities.getSetting("sms_api_token");
        let number= visitor_phone;
        number=number.replace("+","");
        if(!number.startsWith('234')){
            number="234"+number;
        } 
        let app_name=await middleUtilities.getSetting("app_name");
        let app_url=await middleUtilities.getSetting("app_url");
        let message='Hi '+visitor_name+', your '+app_name+' pass code is '+visitor_code+'. You can also show the attached barcode image as a pass at the point of entry. Note: The pass code is valid till '+momentString;
        let sender_id=await middleUtilities.getSetting("sms_sender_name");
        let smtp_name=await middleUtilities.getSetting("smtp_name");
        let smtp_email=await middleUtilities.getSetting("smtp_email");
        let smtp_password=await middleUtilities.getSetting("smtp_password");
        let sender_email=await middleUtilities.getSetting("sender_email");
        let sender_name=await middleUtilities.getSetting("sender_name");
        //let sendgrid=await middleUtilities.getSetting("sendgrid_apiKey");
        let receiver_email=visitor_email;
        let subject=app_name+" Invitation"

        let barcode=await middleUtilities.stringToBarCodeBase64(visitor_code);
        /**let attachments=[{
            content: barcode,
            filename: 'invite.gif',
            type: 'image/gif',
            disposition: 'attachment'
        }];**/

        let attachments=[{
            path: 'data:image/gif;base64,'+barcode,
            filename: 'invite.gif'
        }];
        if(number!=""){
            middleUtilities.sendSMS(apiKey,number,message,sender_id);
        }


        message='Hi '+visitor_name+',<br/><br/> your '+app_name+' pass code is '+visitor_code+'. You can also show the attached barcode image as a pass at the point of entry. <br/><br/><strong>Note:</strong> The pass code is valid till '+momentString+'<br/><br/>';
       

        if(receiver_email!=""){
    
            middleUtilities.sendEmail(smtp_name,smtp_email,smtp_password,sender_email,sender_name,receiver_email,visitor_name,message,subject,attachments)
       
       }
       
        

        return invite;
    }
}

export default CreateInviteService;