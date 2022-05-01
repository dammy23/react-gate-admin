import { Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';
import invitationRouter from '@modules/invitation/infra/http/routes/invitation.routes';
import tenantsRouter from '@modules/tenant/infra/http/routes/tenants.routes';
import visitationRouter from '@modules/visitation/infra/http/routes/visitations.routes';
import settingsRouter from '@modules/settings/infra/http/routes/setting.routes';


import pagesRouter from '@modules/pages.routes';
import generalRouter from '@modules/general/infra/http/routes/general.routes';
const routes = Router();

routes.use(usersRouter);
routes.use(invitationRouter);
routes.use(tenantsRouter);
routes.use(visitationRouter);
routes.use(settingsRouter);
routes.use(pagesRouter);
routes.use(generalRouter);

export default routes;