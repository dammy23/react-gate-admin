import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Setting from '../infra/typeorm/entities/Setting';
import MiddleUtilities from '@config/utilities';
interface Request {
    id: string;
    name: string,
    value: string,
   

}

class UpdateSettingService {
    public async execute({ id, name, value}: Request): Promise<Setting> {
        const middleUtilities= new MiddleUtilities();
        let sett=await middleUtilities.getSetting("app_name");
        console.log(sett);
        const settingsRepository = getRepository(Setting);

        const settingExists = await settingsRepository.findOne(id);

        if (!settingExists) {
            throw new Error('Setting does not exists');
        }

        settingExists.name = name;
        settingExists. value=  value;
       
        
        settingExists.updated_at = new Date(Date.now());


        return await settingsRepository.save(settingExists);
    }
}

export default UpdateSettingService;