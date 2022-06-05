import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';

interface Request {
    id: string;
    name: string,
    email: string,
    type:number,
    phone: string,
    guard_id :string,
    house_number: string, 
    street_name: string,
    tenants: number,
    push_token:string

}

class UpdateUserService {
    public async execute({ id, name, type, email,phone,guard_id,house_number, street_name,tenants,push_token}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(id);

        if (!userExists) {
            throw new Error('User does not exists');
        }
        
        userExists.name = name?name:userExists.name;
        userExists.email = email?email:userExists.email;
        userExists.type=type?type: userExists.type,
        userExists.phone= phone?phone:userExists.phone,
        userExists.guard_id=guard_id?guard_id: userExists.guard_id,
        userExists.house_number= house_number?house_number:userExists.house_number, 
        userExists.street_name= street_name?street_name:userExists.street_name,
        userExists.push_token= push_token?push_token:userExists.push_token,

        
        userExists.updated_at = new Date(Date.now());
        await usersRepository.save(userExists);
        const user = await usersRepository.findOne(id);
        if (!user) {
            throw new Error('User does not exists');
        }

        return user;
    }
}

export default UpdateUserService;