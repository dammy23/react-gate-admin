import User from '@modules/user/infra/typeorm/entities/User';
import { getRepository } from 'typeorm';
import { Creator } from '../infra/typeorm/entities/creator';

import Invitation from '../infra/typeorm/entities/Invitation';

interface Request {
    creator_id:string,
    visitor_name: string;
    visitor_phone: string;
    visitor_email:string; 
    check_visitor:boolean;
    expiry_date:Date;
    multiple_entry_exit: boolean;
    no_of_people:number;
    imageName?:string;

    
}
 
class CreateInviteService {
    public async execute({  creator_id,visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,imageName  }: Request): Promise<Invitation> {
        const invitesRepository = getRepository(Invitation);
        const userRepository = getRepository(User);

        const userExists = await userRepository.findOne(creator_id);
        if (!userExists) {
            throw new Error('User does not exists');
        }

        var  user= new Creator(userExists.id+"hh",userExists.name,userExists.email);

        const invite = invitesRepository.create({  creator_id,visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,visitor_image:imageName,creator: user,isActive:  true  });

        await invitesRepository.save(invite);

        return invite;
    }
}

export default CreateInviteService;