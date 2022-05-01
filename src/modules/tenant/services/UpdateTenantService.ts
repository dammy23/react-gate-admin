import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Tenant from '../infra/typeorm/entities/Tenant';

interface Request {
    id: string;
    name: string;
    landlord_id: string;
    apartment_description: string;
    phone: string;
    email:string;
}

class UpdateTenantService {
    public async execute({ id, name,landlord_id, apartment_description, phone,email }: Request): Promise<Tenant> {
        const tenantsRepository = getRepository(Tenant);

        const tenantExists = await tenantsRepository.findOne(id);

        if (!tenantExists) {
            throw new Error('Tenant does not exists');
        }

        tenantExists.name = name;
        tenantExists.landlord_id = landlord_id;
        tenantExists.apartment_description = apartment_description;
        tenantExists.phone= phone;
        tenantExists.email = email;
        tenantExists.updated_at = new Date(Date.now());


        return await tenantsRepository.save(tenantExists);
    }
}

export default UpdateTenantService;