import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../infra/typeorm/entities/User';

interface Request {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(id);

        if (!userExists) {
            throw new Error('User does not exists');
        }

       
        
        await usersRepository.delete(id);
        return userExists;
    }
}

export default DeleteUserService;