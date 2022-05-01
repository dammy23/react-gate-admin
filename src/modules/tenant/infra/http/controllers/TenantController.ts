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
        const { id } = request.params;
        const { name, landlord_id, apartment_description, phone,email   } = request.body;

        const updateTenant= new UpdateTenantService();
        
        

            const tenant = await updateTenant.execute({ id, name, landlord_id, apartment_description, phone,email   });

            return response.status(200).json(tenant);
        
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
        const { id } = request.params;

        const listTenants = new ListTenantsService();

        const tenants = await listTenants.execute(id);

        return response.status(200).json(tenants);
    }
}