import { Request, Response } from 'express';

import CreateInviteService from '../../../../../modules/invitation/services/CreateInviteService';
import UpdateInviteService from '../../../../../modules/invitation/services/UpdateInviteService';
import ListInviteService from '../../../../../modules/invitation/services/ListInviteService';
import DeleteInviteService from '../../../../../modules/invitation/services/DeleteInviteService';
import ListLatestInviteService from '../../../../../modules/invitation/services/ListLatestInviteService';
import SearchInviteService from '../../../../../modules/invitation/services/SearchInviteService';
import CheckAllInvites from '../../../../../modules/invitation/services/CheckAllInvites';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        try{
            const { creator_id, visitor_name,visitor_phone, visitor_email,visitor_code,check_visitor,expiry_date,multiple_entry_exit,no_of_people,note } = request.body;
            const createInvite = new CreateInviteService();

            var file="None";
                if(request.file!=undefined){
                    file=request.file.filename
                }

            const invite = await createInvite.execute({ creator_id, visitor_name,visitor_code,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people, imageName: file,note  });

            return response.status(200).json(invite);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,note } = request.body;

        const updateInvite = new UpdateInviteService();
        
        

        try {
            var file="None";
            if(request.file!=undefined){
                file=request.file.filename
            }
            
            const invite = await updateInvite.execute({ id, visitor_name,visitor_phone, visitor_email,check_visitor,expiry_date,multiple_entry_exit,no_of_people,imageName: file,note });

            return response.status(200).json(invite);
        } catch (err) {
           
            return response.status(400).json({ message: 'Invite does not exists' });
        }
    },

    async show(request: Request, response: Response): Promise<Response> {
        try{
        const listInvites = new ListInviteService();

        const {id}  = request.params;

        let options={};
        if(id=="all"){
            if(request.query.search){
               
                    options={
                        ...options,
                        where:{
                            $or:[
                                    {visitor_name:new RegExp(request.query.search.toString(),'i')},
                                    {visitor_email:new RegExp(request.query.search.toString(),'i')},
                                    {visitor_phone:new RegExp(request.query.search.toString(),'i')}
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
                                    {creator_id:id},
                                    {$or:[
                                        {visitor_name:new RegExp(request.query.search.toString(),'i')},
                                        {visitor_email:new RegExp(request.query.search.toString(),'i')},
                                        {visitor_phone:new RegExp(request.query.search.toString(),'i')}
                                    ]}
                                ]
                            }
                        }
                    
                }else{
                    options={
                        ...options,
                        where:{
                        creator_id:id
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



        const res = await listInvites.execute({id,options,page,take});
        
        return response.status(200).json(res);
    } catch (err) {
        return response.status(400).json({ message:err});
    }
    },
    async checkStatus(request: Request, response: Response): Promise<Response> {
        
        
        const checkInvites = new CheckAllInvites();
        
        const res = await checkInvites.execute();
        return response.status(200).json(res);
       
    },
    async showLatest(request: Request, response: Response): Promise<Response> {
        const listInvites = new ListLatestInviteService();
        const {id}  = request.params;

        const res = await listInvites.execute({id});

        return response.status(200).json(res);
    },
    
    async search(request: Request, response: Response): Promise<Response> {
        const listInvites = new SearchInviteService();
        const {id}  = request.params;

        const res = await listInvites.execute({id});

        return response.status(200).json(res);
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteInvites = new DeleteInviteService();
        const {id}  = request.params;
        
        await deleteInvites.execute({id});

        return response.status(200).json({ message: 'Invite Deleted' });
    }
} 