import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Visitation from '../infra/typeorm/entities/Visitation';

interface Request {
    id: string;
    visitor: string;
    guard_id: string;
}

class UpdateVisitationService {
    public async execute({ id, visitor, guard_id  }: Request): Promise<Visitation> {
        const visitationsRepository = getRepository(Visitation);

        const visitationExists = await visitationsRepository.findOne(id);

        if (!visitationExists) {
            throw new Error('Visitation does not exists');
        }

        visitationExists.visitor = visitor;
        visitationExists.guard_id = guard_id;
        visitationExists.updated_at = new Date(Date.now());


        return await visitationsRepository.save(visitationExists);
    }
}

export default UpdateVisitationService;