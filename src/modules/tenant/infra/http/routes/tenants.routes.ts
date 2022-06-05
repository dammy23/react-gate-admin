import { Router } from 'express';

import TenantsController from '../controllers/TenantController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const tenantsRouter = Router();

tenantsRouter.get('/tenant/list/:id', TenantsController.show);
tenantsRouter.post('/tenant/create', ensureAuthenticated, TenantsController.create);
tenantsRouter.put('/tenant/update/:id', ensureAuthenticated, TenantsController.update);
tenantsRouter.delete('/tenant/delete/:id', ensureAuthenticated, TenantsController.delete);
tenantsRouter.delete('/tenant/deactivate/:id/:type', ensureAuthenticated, TenantsController.deactivate);

export default tenantsRouter;