import { getRepository, ObjectID } from 'typeorm';
import setting_view from '../views/settings_view';

import Setting from '../infra/typeorm/entities/Setting';


interface Request {
    name: string;
    value: string;
   
    
}

interface SettingReturn {
    id: ObjectID,
    name: string,
    value: string,
    
}

class CreateSettingService {
    public async execute({ name,value }: Request): Promise<SettingReturn> {
        const settingsRepository = getRepository(Setting);
       
        const setting = settingsRepository.create({  name, value });

        await settingsRepository.save(setting);

        const settingFormatted = setting_view.render(setting);

        return settingFormatted;
    }
}

export default CreateSettingService;