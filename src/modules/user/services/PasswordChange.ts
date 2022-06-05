import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

import User from '../infra/typeorm/entities/User';

interface Request {
    id: string;
    password: string;
    newpassword: string;
    confirmpassword: string;
}

class PasswordChange {
    public async execute({ id, password, newpassword, confirmpassword}: Request): Promise<User> {
        const usersRepository = getRepository(User);
        if( newpassword!=confirmpassword){
           
                throw new Error('Password does not match');
            
        }

        const userExists = await usersRepository.findOne(id);
        const hashProvider = new BCryptHashProvider();
        

        if (!userExists) {
            
            throw new Error('User does not exists');
        }
        const passwordMatched = await hashProvider.compareHash(password, userExists.password);

        if (!passwordMatched) {
            throw new Error('Incorrect password ');
        }

        const hashedPassword = await hashProvider.generateHash(newpassword);
        userExists.password = hashedPassword;
        
        userExists.updated_at = new Date(Date.now());
        await usersRepository.save(userExists);
       

        return userExists;
    }
}

export default PasswordChange;