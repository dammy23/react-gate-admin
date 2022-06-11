import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../infra/typeorm/entities/User';

interface Request {
    id: string;
    imageName?: string;
   
}


class CreateUserService {
    public async execute({ id,imageName }: Request): Promise<User> {
       
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(id);

        if (!userExists) {
            throw new Error('User does not exists');
        }

        if (userExists.image) {
            const userImageFilePath = path.join(
                path.join(__dirname, '..', '..', '..', '..', 'uploads'),
                userExists.image,
            );

            const userImageFileExists = await fs.promises.stat(userImageFilePath);

            if (userImageFileExists && imageName!="None") {
                await fs.promises.unlink(userImageFilePath);
            }
        }
        if (userExists.image) {
            if(imageName=="None"){
                userExists.image = userExists.image;
            }else{
                
            
                    userExists.image = imageName;
            }
        }
        //userExists.image = imageName ? imageName : userExists.image;
        userExists.updated_at = new Date(Date.now());

        await usersRepository.save(userExists);

        return userExists;
    }
}

export default CreateUserService;