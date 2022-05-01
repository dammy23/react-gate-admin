import { getRepository } from 'typeorm';

import Invitation from '../infra/typeorm/entities/Invitation';

interface Request {
    id: string;
}

class SearchInviteService {
    public async execute({id}: Request): Promise<Invitation> {
        const latestRepository = getRepository(Invitation);
    
        
        const invites = await latestRepository.findOne(id);
        if (!invites) {

            throw new Error('Invitation does not exists');
        }
        
        return invites;
    }
}

export default SearchInviteService;