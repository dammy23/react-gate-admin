import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Visitation from '../infra/typeorm/entities/Visitation';

interface Request {
    id: string;
}

class DeleteVisitationService {
    public async execute({ id }: Request): Promise<Visitation> {
        const visitationsRepository = getRepository(Visitation);

        const visitationExists = await visitationsRepository.findOne(id);

        if (!visitationExists) {
            throw new Error('Visitation does not exists');
        }

        
        
        await visitationsRepository.delete(id);
        return visitationExists;
    }
}

export default DeleteVisitationService;