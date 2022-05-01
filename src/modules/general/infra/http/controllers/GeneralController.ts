import { Request, Response } from 'express';

import DashBoardService from '@modules/general/services/DashBoardService';
import PasswordService from '@modules/general/services/PasswordService';
import StatService from '@modules/general/services/StatService';
import ReportService from '@modules/general/services/ReportService';

export default {
    async statistics(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const createUser = new StatService();

        const general = await createUser.execute({ id});

        return response.json(general);
    },
    async updatePassword(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {  password, newpassword,confirmpassword } = request.body;

        const updateUser= new PasswordService();
        
        

            const general = await updateUser.execute({ id,password, newpassword,confirmpassword });

            return response.status(200).json(general);
        
    },
   
    
    async dashboard(request: Request, response: Response): Promise<Response> {
       
        const { param,param2} = request.params;
        const listObj = new DashBoardService();

        const obj = await listObj.execute({param,param2});

        return response.status(200).json(obj);
    },
    
    async showReport(request: Request, response: Response): Promise<Response> {
       
        const {id}  = request.params;
        const reportService = new ReportService();

        const report = await reportService.execute({id});

        return response.status(200).json(report);
    }
}