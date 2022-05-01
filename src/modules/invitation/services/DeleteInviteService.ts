import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Invitation from '../infra/typeorm/entities/Invitation';

interface Request {
    id: string;
}

class DeleteInviteService {
    public async execute({ id }: Request): Promise<Invitation> {
        const inviteRepository = getRepository(Invitation);

        const inviteExists = await inviteRepository.findOne(id);

        if (!inviteExists) {
            throw new Error('Course does not exists');
        }

       
        
        await inviteRepository.delete(id);
        return inviteExists;
    }
}

export default DeleteInviteService;