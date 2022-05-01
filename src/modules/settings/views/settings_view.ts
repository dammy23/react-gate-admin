import Setting from '../infra/typeorm/entities/Setting';

export default {
    render(setting: Setting) {
        return {
            id: setting.id,
            name: setting.name,
            value: setting.value,
           
        };
    }
}