import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../../../modules/user/infra/typeorm/entities/User';
import Tenant from '../../../modules/tenant/infra/typeorm/entities/Tenant';
import Invitation from '../../../modules/invitation/infra/typeorm/entities/Invitation';
import Visitation from '../../../modules/visitation/infra/typeorm/entities/Visitation';
import Setting from '../../../modules/settings/infra/typeorm/entities/Setting';



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