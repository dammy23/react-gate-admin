import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Setting from '../infra/typeorm/entities/Setting';

interface Request {
    id: string;
}

class DeleteSettingService {
    public async execute({ id }: Request): Promise<Setting> {
        const settingsRepository = getRepository(Setting);

        const settingExists = await settingsRepository.findOne(id);

        if (!settingExists) {
            throw new Error('Setting does not exists');
        }

       
        
        await settingsRepository.delete(id);
        return settingExists;
    }
}

export default DeleteSettingService;