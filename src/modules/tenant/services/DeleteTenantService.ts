import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Tenant from '../infra/typeorm/entities/Tenant';
import User from '../../../modules/user/infra/typeorm/entities/User';

interface Request {
    id: string;
    
}

class DeleteTenantService {
    public async execute({ id }: Request): Promise<Tenant> {
        const tenantsRepository = getRepository(Tenant);

        const tenantExists = await tenantsRepository.findOne(id);

        if (!tenantExists) {
            throw new Error('Tenant does not exists');
        }

        tenantExists.deleted = true;
        tenantExists.updated_at = new Date(Date.now());
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(tenantExists.landlord_id);

        if (!userExists) {
            throw new Error('User does not exists.');
        }
        userExists.tenants = userExists.tenants ? userExists.tenants -= 1 : 1;

        await usersRepository.save(userExists);


        return await tenantsRepository.save(tenantExists);
    }
}

export default DeleteTenantService;