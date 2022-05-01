import { getRepository } from 'typeorm';

import User from '../infra/typeorm/entities/User';

class ListUsersService {
    public async execute(): Promise<User[]> {
        const usersRepository = getRepository(User);

        const users = await usersRepository.find();

        return users;
    }
}

export default ListUsersService;