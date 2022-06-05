import { getRepository } from 'typeorm';

import User from '../infra/typeorm/entities/User';
interface Request {
    options: any;
    page: number;
    take: number;
   
}
class ListUsersService {
    public async execute({ options, page,take }: Request): Promise<Object>{
        const usersRepository = getRepository(User);

        const users = await usersRepository.find({
            ...options,
            take,
            skip: (page-1) * take
        });
       
        const total = await usersRepository.count();
        let result={
            data:users,
            total:total,
            page:page,
            lastpage:Math.ceil(total/take)
        }
        
        
        
        return result;
    }
}

export default ListUsersService;