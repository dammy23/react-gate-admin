import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import SessionsController from '../controllers/SessionsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

 
const usersRouter = Router();
 
const upload = multer(uploadConfig);
  
usersRouter.post('/user/create',ensureAuthenticated, UsersController.create);
usersRouter.post('/user/authenticate', SessionsController.create);
usersRouter.post('/user/mobile-authenticate', SessionsController.createMobile);
usersRouter.get('/user/list', UsersController.show);
usersRouter.get('/user/list-single/:id',ensureAuthenticated, UsersController.showSingle);
usersRouter.put('/user/update/:id', ensureAuthenticated, UsersController.update);
usersRouter.post('/user/uploadimage/:id', ensureAuthenticated, upload.single('image'), UsersController.uploadImage);
usersRouter.put('/user/passwordupdate/:id', ensureAuthenticated, UsersController.passwordUpdate);
usersRouter.delete('/user/delete/:id', ensureAuthenticated, UsersController.delete);


export default usersRouter;