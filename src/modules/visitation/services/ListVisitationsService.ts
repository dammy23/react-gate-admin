import { getRepository } from 'typeorm';

import Visitation from '../infra/typeorm/entities/Visitation';

class ListVisitationsService {
    public async execute(id: string): Promise<Visitation[]> {
        const visitationsRepository = getRepository(Visitation).createQueryBuilder().where("guard_id = '"+id+"'").orderBy('count', 'ASC');

        const visitations = await visitationsRepository.getMany();

        return visitations;
    }
}

export default ListVisitationsService;