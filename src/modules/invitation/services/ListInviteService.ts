import { getRepository } from 'typeorm';

import Invitation from '../infra/typeorm/entities/Invitation';
interface Request {
    id:string;
    options: any;
    page: number;
    take: number;
   
}

class ListInviteService {
    public async execute({ id,options, page,take }: Request): Promise<Object> {
        const inviteRepository = getRepository(Invitation);
        let invite = await inviteRepository.find({
                ...options,
                take,
                skip: (page-1) * take
            });
        
        if (!invite) {

            throw new Error('Invitation does not exists');
        }

        const total = await inviteRepository.count({creator_id:id});
        let result={
            data:invite,
            total:total,
            page:page,
            lastpage:Math.ceil(total/take)
        }
        
        
        
        return result;
    }
}
 
export default ListInviteService;