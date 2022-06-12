import { Request, Response } from 'express';

import CreateSettingService from '../../../../../modules/settings/services/CreateSettingService';
import ListSettingsService from '../../../../../modules/settings/services/ListSettingsService';
import UpdateSettingService from '../../../../../modules/settings/services/UpdateSettingService';
import DeleteSettingService from '../../../../../modules/settings/services/DeleteSettingService';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { name, value} = request.body;

        const createSetting = new CreateSettingService();

        const settings = await createSetting.execute({ name, value,  });

        return response.json(settings);
    },
    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, value } = request.body;

        const updateSetting= new UpdateSettingService();
        
        

            const settings = await updateSetting.execute({ id, name, value  });

            return response.status(200).json(settings);
        
    },
    async delete(request: Request, response: Response): Promise<Response> {
        const deleteSettings = new DeleteSettingService();
        const {id}  = request.params;
        
        await deleteSettings.execute({id});

        return response.status(200).json({ message: 'Setting Deleted' });
    },
    
    async show(request: Request, response: Response): Promise<Response> {
       

        const listSettings = new ListSettingsService();

        const settings = await listSettings.execute();

        return response.status(200).json(settings);
    }
}