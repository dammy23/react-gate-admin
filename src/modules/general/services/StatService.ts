import User from '../../../modules/user/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';


interface Request {
    id: string;
}
class StatService {
    public async execute({id}: Request): Promise<User> {
        const usersRepository = getRepository(User);
        
        const user = await usersRepository.findOne(id);

        if (!user ) {
            throw new Error('User does not exists');
        }

        return user;
    }
}

export default StatService;