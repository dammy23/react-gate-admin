import { getRepository } from 'typeorm';

import Setting from '../infra/typeorm/entities/Setting';

class ListSettingsService {
    public async execute(): Promise<Setting[]> {
        const settingsRepository = getRepository(Setting);

        const settings = await settingsRepository.find();

        return settings;
    }
}

export default ListSettingsService;