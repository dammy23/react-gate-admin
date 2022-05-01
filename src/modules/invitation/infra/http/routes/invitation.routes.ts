import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import InvitationsController from '../controllers/InvitationsController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const invitationRouter = Router();
const upload = multer(uploadConfig);

invitationRouter.get('/invitation/list/:id', ensureAuthenticated,InvitationsController.show);
invitationRouter.get('/invitation/listlatest/:id', ensureAuthenticated,InvitationsController.showLatest);
invitationRouter.get('/invitation/search/:id',ensureAuthenticated, InvitationsController.search);


invitationRouter.post('/invitation/create', ensureAuthenticated, upload.single('visitor_image'), InvitationsController.create);
invitationRouter.put('/invitation/update/:id', ensureAuthenticated, upload.single('visitor_image'), InvitationsController.update);
invitationRouter.delete('/invitation/delete/:id', ensureAuthenticated, InvitationsController.delete);
invitationRouter.get('/invitation/check_invite/',  InvitationsController.checkStatus);

export default invitationRouter;