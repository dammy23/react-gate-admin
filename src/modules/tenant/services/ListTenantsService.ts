import { getRepository } from 'typeorm';

import Tenant from '../infra/typeorm/entities/Tenant';

class ListTenantsService {
    public async execute(id: string): Promise<Tenant[]> {
        const tenantsRepository = getRepository(Tenant);
        const tenants = await tenantsRepository.find({landlord_id:id,deleted:false});

        return tenants;
    }
}

export default ListTenantsService;