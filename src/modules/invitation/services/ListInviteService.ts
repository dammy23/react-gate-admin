import { getRepository } from 'typeorm';

import Invitation from '../infra/typeorm/entities/Invitation';
interface Request {
    id: string;
}
class ListInviteService {
    public async execute({id}: Request): Promise<Invitation[]> {
        const inviteRepository = getRepository(Invitation);
        let invite;
        if(id=="all"){
            invite = await inviteRepository.find();
        }else{
            invite = await inviteRepository.find({creator_id:id});
        }

        if (!invite) {

            throw new Error('Invitation does not exists');
        }
        
        
        
        return invite;
    }
}
 
export default ListInviteService;