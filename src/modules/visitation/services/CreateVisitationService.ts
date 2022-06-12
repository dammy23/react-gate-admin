import { getRepository } from 'typeorm';

import Visitation from '../infra/typeorm/entities/Visitation';
import User from '../../../modules/user/infra/typeorm/entities/User';
import Invitation from '../../../modules/invitation/infra/typeorm/entities/Invitation';
import Tenant from '../../../modules/tenant/infra/typeorm/entities/Tenant';
import moment from "moment";
import MiddleUtilities from '../../../config/utilities';


interface Request {
    visitor: string;
    guard_id: string;
    
}

class CreateVisitationService {
    public async execute({  visitor, guard_id }: Request): Promise<any> {
       
        const visitationsRepository = getRepository(Visitation);
        const usersRepository = getRepository(User);
        const inviteRepository = getRepository(Invitation);
        const tenantRepository = getRepository(Tenant);



        const userExists = await usersRepository.findOne(guard_id);

        if (!userExists) {
            
            throw new Error('User does not exists.');
           
        }
        if(userExists.type!=3){
                
            throw new Error('This is not a guard account');
        }

        const inviteExist= await inviteRepository.findOne({visitor_code: visitor});
       
        if(!inviteExist){
            
            throw new Error('Invalid Gate Code');
        }

        if(inviteExist.creator_id==inviteExist.note && inviteExist.traffic_count>0){
            throw new Error('Invalid Gate Code');
        }


       if(inviteExist.traffic_count==0 && !inviteExist.isActive && !inviteExist.multiple_entry_exit){
        
            throw new Error('Invitation has expired');
       }

       

       var dateObj = new Date(inviteExist.expiry_date);
       var momentObj = moment(dateObj);
       if(moment()>momentObj ){
            throw new Error('Invitation has expired');
       }
       let type=1;
       if(inviteExist.traffic_count==0 || (inviteExist.traffic_count % 2==0))
       {
        type=0; 
       }

       
        inviteExist.traffic_count=inviteExist.traffic_count? inviteExist.traffic_count+=1:1;
        inviteExist.isActive =false;
        
        const user = await usersRepository.findOne(inviteExist.creator_id);
        if(!user){
            const tenant = await tenantRepository.findOne(inviteExist.creator_id);
            if(!tenant){
                throw new Error('User does not exist');
            }
            tenant.visitations = tenant.visitations ? tenant.visitations += 1 : 1;
            await tenantRepository.save(tenant);
        }else{

            user.visitations = user.visitations ? user.visitations += 1 : 1;
            await usersRepository.save(user);
        }
        let inviter=inviteExist.creator_id;
        const visit = visitationsRepository.create({ inviter, visitor, guard_id,type,visitor_name:inviteExist.visitor_name,guard_name:userExists.name});
        
        await visitationsRepository.save(visit);
        await inviteRepository.save(inviteExist);
        
        
        let msg='Your visitor '+ inviteExist.visitor_name+' has arrived';
        if(type==1){
             msg='Your visitor '+ inviteExist.visitor_name+' has departed';
        } 
        if(inviteExist.creator_id==inviteExist.note){
            msg='Your app was used to gain access/exit the estate';
        }

        visit.check_visitor=inviteExist.check_visitor
        const message = {
            to: user?.push_token,
            sound: 'default',
            title: 'Gate Pass Notification',
            body: msg,
            data:visit,
          };
          const middleUtilities= new MiddleUtilities();
          middleUtilities.sendPushNotification(message)
        
        
        return visit;
    }
}

export default CreateVisitationService;