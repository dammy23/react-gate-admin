import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Tenant from '../infra/typeorm/entities/Tenant';

interface Request {
    id: string;
    type:string;
    
}

class DeactivateTenantService {
    public async execute({ id,type }: Request): Promise<Tenant> {
        const tenantsRepository = getRepository(Tenant);

        const tenantExists = await tenantsRepository.findOne(id);

        if (!tenantExists) {
            throw new Error('Tenant does not exists');
        }
        if(type.trim()=="activate")
            tenantExists.status = true;
        else
            tenantExists.status = false;
        tenantExists.updated_at = new Date(Date.now());


        return await tenantsRepository.save(tenantExists);
    }
}

export default  DeactivateTenantService;