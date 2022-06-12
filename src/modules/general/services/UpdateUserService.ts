import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../../../modules/user/infra/typeorm/entities/User';

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

}

class UpdateUserService {
    public async execute({ id, name, type, email,phone,guard_id,house_number, street_name,tenants}: Request): Promise<User> {
        const lessonsRepository = getRepository(User);

        const lessonExists = await lessonsRepository.findOne(id);

        if (!lessonExists) {
            throw new Error('User does not exists');
        }

        lessonExists.name = name;
        lessonExists.email = email;
        lessonExists.type=type,
        lessonExists.phone= phone,
        lessonExists.guard_id=guard_id,
        lessonExists.house_number= house_number, 
        lessonExists.street_name= street_name,
        lessonExists.tenants= tenants
        
        lessonExists.updated_at = new Date(Date.now());


        return await lessonsRepository.save(lessonExists);
    }
}

export default UpdateUserService;