import { getRepository } from 'typeorm';

import Invitation from '../infra/typeorm/entities/Invitation';

interface Request {
    id: string;
}

class ListLatestInviteService {
    public async execute({id}: Request): Promise<Invitation[]> {
        const latestRepository = getRepository(Invitation);
        const inviteExists = await latestRepository.findOne(id);
        if (!inviteExists) {
            throw new Error('Invite does not exists');
        }
        
        
        const search=inviteExists.created_at.getFullYear()+"-"+(inviteExists.created_at.getMonth()+1)+"-"+inviteExists.created_at.getDate()+" "+inviteExists.created_at.getHours()+":"+inviteExists.created_at.getMinutes()+":"+(inviteExists.created_at.getSeconds()+1);
        
        const invitesRepository = getRepository(Invitation).createQueryBuilder().where("created_at > '"+search+"'");
        //console.log(invitesRepository.getQuery())

        const invites = await invitesRepository.getMany();
        
        return invites;
    }
}

export default ListLatestInviteService;