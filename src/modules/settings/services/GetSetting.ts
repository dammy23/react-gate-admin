import { getRepository } from 'typeorm';

import Setting from '../infra/typeorm/entities/Setting';

class GetSetting {
    public async execute(name:any): Promise<string> {
        const settingsRepository = getRepository(Setting);

        const setting = await settingsRepository.findOne({name:name});
        if (!setting) {
          throw new Error('Setting does not exists');
      }
        return setting.value;
    }
}

export default GetSetting;