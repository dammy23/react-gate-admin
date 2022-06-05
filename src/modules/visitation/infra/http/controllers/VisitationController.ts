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
            return response.status(400).json(err);
        }
    },
    async update(request: Request, response: Response): Promise<Response> {
        try{
            const { id } = request.params;
            const {visitor, guard_id    } = request.body;

            const updateVisitation= new UpdateVisitationService();
            const visitation = await updateVisitation.execute({ id,visitor, guard_id   });

            return response.status(200).json(visitation);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        try{
            const deleteVisitations = new DeleteVisitationService();
            const {id}  = request.params;
            
            await deleteVisitations.execute({id});

            return response.status(200).json({ message: 'Visitation Deleted' });
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },
    
    async show(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            const listVisitations = new ListVisitationsService();

            const {id}  = request.params;

            let options={};
            if(id=="all"){
                if(request.query.search){
                
                        options={
                            ...options,
                            where:{
                                $or:[
                                        {visitor_name:new RegExp(request.query.search.toString(),'i')},
                                        {guard_name:new RegExp(request.query.search.toString(),'i')}
                                    ]
                            }
                        }
                    
                }
            }else{
                    if(request.query.search){
                    
                            options={
                                ...options,
                                where:{
                                    $and : [
                                        {
                                            
                                            $or:[
                                                {inviter:id},
                                                {guard_id:id}
                                                
                                            ]
                                        
                                        },
                                        {$or:[
                                                {visitor_name:new RegExp(request.query.search.toString(),'i')},
                                                {guard_name:new RegExp(request.query.search.toString(),'i')}
                                                
                                            ]
                                        }
                                    ]
                                }
                            }
                        
                    }else{
                        options={
                            ...options,
                            where:{
                                $or:[
                                    {inviter:id},
                                    {guard_id:id}
                                    
                                ]
                            
                            }
                        }
                    }
            }

            if(request.query.sortcolumn && request.query.sort){
                if(request.query.sortcolumn!="" && request.query.sort!=""){
                    let sort={};
                    let key=request.query.sortcolumn.toString() as any;
                    
                    sort[key]=request.query.sort.toString().toUpperCase();
                    //Object.fromEntries(Object.entries(sort).concat([[key,request.query.sort.toString().toUpperCase()]]))

                    options={
                        ...options,
                        order:{
                            ...sort
                        }
                    }
                }
            
            }

            const page:number = parseInt(request.query.page as any) || 1
            const take:number = parseInt(request.query.take as any) || 10



            const visitations = await listVisitations.execute({id,options,page,take});

        
            return response.status(200).json(visitations);

    } catch (err) {
        return response.status(400).json({ message:err});
    }
    }
}