import { getRepository } from 'typeorm';

import Visitation from '../infra/typeorm/entities/Visitation';

interface Request {
    id:string;
    options: any;
    page: number;
    take: number;
   
}

class ListVisitationsService {
    public async execute({ id,options, page,take }: Request): Promise<Object> {
        const visitationRepository = getRepository(Visitation);
        let invite = await visitationRepository.find({
                ...options,
                take,
                skip: (page-1) * take
            });
        
        if (!invite) {

            throw new Error('Invitation does not exists');
        }

        let total = await visitationRepository.count({guard_id:id});
        let vtotal = await visitationRepository.count({inviter:id});
        if(total==0){
            total=vtotal;
        }
        let result={
            data:invite,
            total:total,
            page:page,
            lastpage:Math.ceil(total/take)
        }
        
        
        
        return result;
    }
}

export default ListVisitationsService;