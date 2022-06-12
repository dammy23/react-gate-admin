






import { Router } from 'express';

import GeneralController from '../controllers/GeneralController';

import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';


const generalRouter = Router();


generalRouter.get('/general/dashboard/:param/:param2',ensureAuthenticated, GeneralController.dashboard);
generalRouter.get('/general/mobilestat/:id',ensureAuthenticated, GeneralController.mobileStat);
generalRouter.get('/general/statistics/:param/:param2',ensureAuthenticated,GeneralController.statistics);
generalRouter.get('/general/reports/::param/:param2',ensureAuthenticated,GeneralController.showReport);
generalRouter.put('/user/password/:id', ensureAuthenticated, GeneralController.updatePassword);

//generalRouter.post('/user/authenticate', SessionsController.create);
//generalRouter.delete('/user/delete/:id', ensureAuthenticated, UsersController.delete);


export default generalRouter;