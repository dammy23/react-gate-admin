import { getRepository, ObjectID } from 'typeorm';
import user_view from '../views/users_view';

import User from '../infra/typeorm/entities/User';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';

interface Request {
    name: string;
    email: string;
    password: string;
    type:number;
    phone: string;
    guard_id :string;
    house_number: string;
    street_name: string;
    tenants: number;
}

interface UserReturn {
    id: ObjectID,
    name: string,
    email: string,
    type:number,
    phone: string,
    guard_id :string,
    house_number: string, 
    street_name: string,
    tenants: number
}

class CreateUserService {
    public async execute({ name, type,email,phone,guard_id,house_number, street_name,tenants, password }: Request): Promise<UserReturn> {
        const usersRepository = getRepository(User);
        const hashProvider = new BCryptHashProvider();
        
        const hashedPassword = await hashProvider.generateHash(password);

        const user = usersRepository.create({  name, type,email,phone,guard_id,house_number, street_name,tenants, password: hashedPassword,visitations:0 });

        await usersRepository.save(user);

        const userFormatted = user_view.render(user);

        return userFormatted;
    }
}

export default CreateUserService;