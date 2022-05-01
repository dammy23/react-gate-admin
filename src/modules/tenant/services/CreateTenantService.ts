import { getRepository } from 'typeorm';

import Tenant from '../infra/typeorm/entities/Tenant';
import User from '@modules/user/infra/typeorm/entities/User';

interface Request {
    name: string;
    landlord_id: string;
    apartment_description: string;
    phone: string;
    email:string;
    password:string;
}

class CreateTenantService {
    public async execute({ name, landlord_id, apartment_description, phone,email,password }: Request): Promise<Tenant> {
        const tenantsRepository = getRepository(Tenant);
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(landlord_id);

        if (!userExists) {
            throw new Error('User does not exists.');
        }

        const tenant = tenantsRepository.create({ name, landlord_id, apartment_description, phone,email,password, status:true,deleted:false,visitations:0 });

        if (!tenant) {
            throw new Error('Tenant count already is set.');
        }

        await tenantsRepository.save(tenant);
        
        userExists.tenants = userExists.tenants ? userExists.tenants += 1 : 1;

        await usersRepository.save(userExists);
        
        return tenant;
    }
}

export default CreateTenantService;