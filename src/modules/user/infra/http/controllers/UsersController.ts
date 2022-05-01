import { Request, Response } from 'express';

import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import ListUserSingleService from '@modules/user/services/ListUserSingleService';
import UpdateUserService from '@modules/user/services/UpdateUserService';
import DeleteUserService from '@modules/user/services/DeleteUserService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, type, email,phone,guard_id,house_number, street_name,tenants, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, type, email,phone,guard_id,house_number, street_name,tenants, password });

        return response.json(user);
    },
    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {  name, type, email,phone,guard_id,house_number, street_name,tenants } = request.body;

        const updateUser= new UpdateUserService();
        
        

            const user = await updateUser.execute({ id,  name, type, email,phone,guard_id,house_number, street_name,tenants  });

            return response.status(200).json(user);
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteUsers = new DeleteUserService();
        const {id}  = request.params;
        
        await deleteUsers.execute({id});

        return response.status(200).json({ message: 'User Deleted' });
    },
    
    async show(request: Request, response: Response): Promise<Response> {
       

        const listUsers = new ListUsersService();

        const users = await listUsers.execute();

        return response.status(200).json(users);
    },
    
    async showSingle(request: Request, response: Response): Promise<Response> {
       
        const {id}  = request.params;
        const listUser = new ListUserSingleService();

        const user = await listUser.execute({id});

        return response.status(200).json(user);
    }
}