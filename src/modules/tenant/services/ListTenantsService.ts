import datatables from 'public/assets/vendor/datatables/datatables';
import { getRepository } from 'typeorm';

import Tenant from '../infra/typeorm/entities/Tenant';

interface Request {
    id:string;
    options: any;
    page: number;
    take: number;
   
}

class ListTenantsService {
    public async execute({ id,options, page,take }: Request): Promise<Object> {
        const tenantsRepository = getRepository(Tenant);
        const tenants = await tenantsRepository.find({
            ...options,
            take,
            skip: (page-1) * take
        });
        const total = await tenantsRepository.count({landlord_id:id,deleted:false});
        let result={
            data:tenants,
            total:total,
            page:page,
            lastpage:Math.ceil(total/take)
        }
        return result;
    }
}

export default ListTenantsService;