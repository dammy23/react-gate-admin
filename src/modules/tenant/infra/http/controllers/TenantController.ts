import { Request, Response } from 'express';

import CreateTenantService from '@modules/tenant/services/CreateTenantService';
import ListTenantsService from '@modules/tenant/services/ListTenantsService';
import UpdateTenantService from '@modules/tenant/services/UpdateTenantService';
import DeleteTenantService from '@modules/tenant/services/DeleteTenantService';
import DectivateTenantService from '@modules/tenant/services/DeactivateTenantService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        
        const { name, landlord_id, apartment_description, phone,email,password   } = request.body;

        const createTenant = new CreateTenantService();

        try {
            const tenant = await createTenant.execute({ name, landlord_id, apartment_description, phone,email,password   });

            return response.json(tenant);
        } catch(err) {
            return response.status(400).json(err.message);
        }
    },
    async update(request: Request, response: Response): Promise<Response> {
        try{
            const { id } = request.params;
            const { name, landlord_id, apartment_description, phone,email   } = request.body;

            const updateTenant= new UpdateTenantService();
            
        

            const tenant = await updateTenant.execute({ id, name, landlord_id, apartment_description, phone,email   });

            return response.status(200).json(tenant);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteTenants = new DeleteTenantService();
        const {id}  = request.params;
        
        await deleteTenants.execute({id});

        return response.status(200).json({ message: 'Tenant Deleted' });
    },
    async deactivate(request: Request, response: Response): Promise<Response> {
        const deleteTenants = new DectivateTenantService();
        const {id,type}  = request.params;
        
        await deleteTenants.execute({id,type});

        return response.status(200).json({ message: 'Success' });
    },
    
    async show(request: Request, response: Response): Promise<Response> {

        try{
            const { id } = request.params;

            let options={};

            if(request.query.search){
                    options={
                        ...options,
                        where:{
                            $and : [
                                {landlord_id:id},
                                {deleted:false},
                                {$or:[
                                    {name:new RegExp(request.query.search.toString(),'i')},
                                    {apartment_description:new RegExp(request.query.search.toString(),'i')},
                                    {email:new RegExp(request.query.search.toString(),'i')},
                                    {phone:new RegExp(request.query.search.toString(),'i')}
                                ]}
                            ]
                        }
                    }
            }else{
                options={
                    ...options,
                    where:{
                        landlord_id:id,
                        deleted:false
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


        
            const listTenants = new ListTenantsService();
        

            const tenants = await listTenants.execute({id,options,page,take});

            return response.status(200).json(tenants);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    }
}