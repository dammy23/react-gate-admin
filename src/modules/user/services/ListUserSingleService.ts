import { getRepository } from 'typeorm';

import User from '../infra/typeorm/entities/User';
interface Request {
    id: string;
}
class ListUserSingleService {
    public async execute({id}: Request): Promise<User> {
        const usersRepository = getRepository(User);
        
        const user = await usersRepository.findOne(id);

        if (!user ) {
            throw new Error('User does not exists');
        }

        return user;
    }
}

export default ListUserSingleService;