import { getRepository } from 'typeorm';

import Invitation from '../infra/typeorm/entities/Invitation';
import moment from 'moment';

class CheckAllInvites {
    public async execute() {
        const inviteRepository = getRepository(Invitation);
        
        const invite = await inviteRepository.find({isActive:true});
        
        invite.forEach(async (item,index)=>{
            let expiry= moment(item.expiry_date);
            let nowDate=moment();
            if(nowDate>expiry){

                const inviteExists = await inviteRepository.findOne(item.id);

                if (!inviteExists) {
                    throw new Error('Invite does not exists');
                }

                inviteExists.isActive = false;
                inviteExists.updated_at = new Date(Date.now());
                await inviteRepository.save(inviteExists);


            }

            
        });
        
        
    }
}

export default CheckAllInvites;