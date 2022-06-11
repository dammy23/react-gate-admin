

import { Request, Response } from 'express';

import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';


export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService();

        try {
            const { user, token } = await authenticateUser.execute({ email, password });
            if(user.type){
                if(user.type==3){
                    return response.status(400).json({ message: 'This is a guard account. Use mobile app' });
                }
            }
                
            request.session.userid=user.id;
            request.session.user=user;
            request.session.token=token;
            
            return response.status(200).json({ user, token });
        } catch (err) {
            return response.status(400).json({ message: 'Incorrect email/password combination.' });
        }
    },
    async createMobile(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;
        const authenticateUser = new AuthenticateUserService();

        try {
            const { user, token } = await authenticateUser.execute({ email, password });
            
            
            request.session.userid=user.id;
            request.session.user=user;
            request.session.token=token;
            
            return response.status(200).json({ user, token });
        } catch (err) {
            return response.status(400).json({ message: 'Incorrect email/password combination.' });
        }
    }
}