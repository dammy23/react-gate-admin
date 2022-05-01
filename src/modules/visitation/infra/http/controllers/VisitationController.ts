import { Request, Response } from 'express';

import CreateVisitationService from '@modules/visitation/services/CreateVisitationService';
import ListVisitationsService from '@modules/visitation/services/ListVisitationsService';
import UpdateVisitationService from '@modules/visitation/services/UpdateVisitationService';
import DeleteVisitationService from '@modules/visitation/services/DeleteVisitationService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { visitor, guard_id    } = request.body;

        const createVisitation = new CreateVisitationService();

        try {
            const visitation = await createVisitation.execute({ visitor, guard_id    });

            return response.json(visitation);
        } catch(err) {
            return response.status(400).json(err.message);
        }
    },
    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {visitor, guard_id    } = request.body;

        const updateVisitation= new UpdateVisitationService();
        
        

            const visitation = await updateVisitation.execute({ id,visitor, guard_id   });

            return response.status(200).json(visitation);
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteVisitations = new DeleteVisitationService();
        const {id}  = request.params;
        
        await deleteVisitations.execute({id});

        return response.status(200).json({ message: 'Visitation Deleted' });
    },
    
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const listVisitations = new ListVisitationsService();

        const visitations = await listVisitations.execute(id);

        return response.status(200).json(visitations);
    }
}