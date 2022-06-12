import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../../../modules/user/infra/typeorm/entities/User';
interface Request {
    id: string;
    password: string,
    newpassword: string,
    confirmpassword: string,
    

}

class PasswordService {
    public async execute({ id, password, newpassword,confirmpassword}: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const usersExists = await usersRepository.findOne(id);

        if (!usersExists) {
            throw new Error('User does not exists');
        }

       
        
        usersExists.updated_at = new Date(Date.now());


        return await usersRepository.save(usersExists);
    }
}

export default PasswordService;