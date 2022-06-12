import { Router } from 'express';

import SettingsController from '../controllers/SettingController';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';


const settingsRouter = Router();

settingsRouter.post('/setting/create', SettingsController.create);
settingsRouter.get('/setting/list', SettingsController.show);
settingsRouter.put('/setting/update/:id', ensureAuthenticated, SettingsController.update);
settingsRouter.delete('/setting/delete/:id', ensureAuthenticated, SettingsController.delete);


export default settingsRouter;