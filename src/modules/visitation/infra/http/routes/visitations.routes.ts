import { Router } from 'express';

import VisitationController from '../controllers/VisitationController';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const visitationsRouter = Router();

visitationsRouter.get('/visitation/list/:id', VisitationController.show);
visitationsRouter.post('/visitation/create', ensureAuthenticated, VisitationController.create);
visitationsRouter.put('/visitation/update/:id', ensureAuthenticated, VisitationController.update);
visitationsRouter.delete('/visitation/delete/:id', ensureAuthenticated, VisitationController.delete);

export default visitationsRouter;