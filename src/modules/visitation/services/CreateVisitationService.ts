import { getRepository } from 'typeorm';

import Visitation from '../infra/typeorm/entities/Visitation';
import User from '@modules/user/infra/typeorm/entities/User';

interface Request {
    visitor: string;
    guard_id: string;
}

class CreateVisitationService {
    public async execute({  visitor, guard_id }: Request): Promise<Visitation> {
        const visitationsRepository = getRepository(Visitation);
        const usersRepository = getRepository(User);

        const userExists = await usersRepository.findOne(guard_id);

        if (!userExists) {
            throw new Error('User does not exists.');
        }

        const visitation = visitationsRepository.create({ visitor, guard_id });

        if (!visitation) {
            throw new Error('Visitation count already is set.');
        }

        await visitationsRepository.save(visitation);
        
        
        return visitation;
    }
}

export default CreateVisitationService;