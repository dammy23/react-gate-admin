import { Request, Response } from 'express';

import CreateUserService from '../../../../../modules/user/services/CreateUserService';
import ListUsersService from '../../../../../modules/user/services/ListUsersService';
import ListUserSingleService from '../../../../../modules/user/services/ListUserSingleService';
import UpdateUserService from '../../../../../modules/user/services/UpdateUserService';
import DeleteUserService from '../../../../../modules/user/services/DeleteUserService';
import PasswordChange from '../../../../../modules/user/services/PasswordChange';
import UploadImage from '../../../../../modules/user/services/UploadImage';

export default { 
    async create(request: Request, response: Response): Promise<Response> {
        try{
            const { name, type, email,phone,guard_id,house_number, street_name,tenants, password } = request.body;

            const createUser = new CreateUserService();

            const user = await createUser.execute({ name, type, email,phone,guard_id,house_number, street_name,tenants, password });

            return response.json(user);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },
    async update(request: Request, response: Response): Promise<Response> {
        try{
            const { id } = request.params;
            const {  name, type, email,phone,guard_id,house_number, street_name,tenants,push_token } = request.body;

            const updateUser= new UpdateUserService();
        

            const user = await updateUser.execute({ id,  name, type, email,phone,guard_id,house_number, street_name,tenants,push_token  });

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
        
    },
    async passwordUpdate(request: Request, response: Response): Promise<Response> {
       
        try{
            const { id } = request.params;
            const {  password, newpassword, confirmpassword } = request.body;

            const updatePassword= new PasswordChange();
            const user = await updatePassword.execute({ id, password, newpassword, confirmpassword});

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        try{
            const deleteUsers = new DeleteUserService();
            const {id}  = request.params;
            
            await deleteUsers.execute({id});

            return response.status(200).json({ message: 'User Deleted' });
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },
    
    async show(request: Request, response: Response): Promise<Response> {
       
        try{
            const listUsers = new ListUsersService();
            let options={};
            if(request.query.search){
               
                options={
                    ...options,
                    where:{
                        $or:[
                                {name:new RegExp(request.query.search.toString(),'i')},
                                {email:new RegExp(request.query.search.toString(),'i')},
                                {phone:new RegExp(request.query.search.toString(),'i')},
                                {street_name:new RegExp(request.query.search.toString(),'i')}
                                
                            ]
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

            const users = await listUsers.execute({options,page,take});

            return response.status(200).json(users);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },
    
    async showSingle(request: Request, response: Response): Promise<Response> {
        try{
       
            const {id}  = request.params;
            const listUser = new ListUserSingleService();

            const user = await listUser.execute({id});

            return response.status(200).json(user);
        } catch (err) {
            return response.status(400).json({ message:err});
        }
    },
 
    async uploadImage(request: Request, response: Response): Promise<Response> {
        const {id}  = request.params;
   
        const uploadImage= new UploadImage();

        const user = await uploadImage.execute({ id,imageName: request.file.filename });

        return response.status(200).json(user);
    },
}