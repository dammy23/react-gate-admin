import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Invitation from '../infra/typeorm/entities/Invitation';

interface Request {
    id: string;
    visitor_name?: string;
    visitor_phone?: string;
    visitor_email?:string; 
    check_visitor:boolean;
    expiry_date?:Date;
    multiple_entry_exit: boolean;
    no_of_people?:number;
    imageName?: string;
    note?: string;
}

class UpdateInviteService {
    public async execute({ id, visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people, imageName,note }: Request): Promise<Invitation> {
        const invitesRepository = getRepository(Invitation);

        const inviteExists = await invitesRepository.findOne(id);

        if (!inviteExists) {
            throw new Error('Invite does not exists');
        }

        if(!inviteExists.isActive)
            throw new Error('Invite Expired');
       
        inviteExists.visitor_name = visitor_name ? visitor_name : inviteExists.visitor_name;
        inviteExists.visitor_phone = visitor_phone ? visitor_phone : inviteExists.visitor_phone;
        inviteExists.visitor_email = visitor_email ? visitor_email : inviteExists.visitor_email;
        inviteExists.no_of_people = no_of_people ? no_of_people : inviteExists.no_of_people;
        inviteExists.check_visitor = check_visitor ? check_visitor : false;
        inviteExists.expiry_date = expiry_date ? expiry_date : inviteExists.expiry_date;
        inviteExists.note = note ? note : inviteExists.note;
        inviteExists.multiple_entry_exit = multiple_entry_exit ? multiple_entry_exit : false;
        if (inviteExists.visitor_image) {
            const inviteImageFilePath = path.join(
                path.join(__dirname, '..', '..', '..', '..', 'uploads'),
                inviteExists.visitor_image,
            );
            if(!inviteImageFilePath.includes("None")){
                const inviteImageFileExists = await fs.promises.stat(inviteImageFilePath);

                if (inviteImageFileExists && imageName!="None") {
                    //await fs.promises.unlink(inviteImageFilePath);
                }
            }
        }
        
        
        if(imageName=="None" || imageName==undefined){
            inviteExists.visitor_image = inviteExists.visitor_image;
        }else{
            
            inviteExists.visitor_image = imageName;
        }
       
        inviteExists.updated_at = new Date(Date.now());


        return await invitesRepository.save(inviteExists);
    }
}

export default UpdateInviteService;