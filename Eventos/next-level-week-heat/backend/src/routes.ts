import { Router } from 'express';
import { AuthenticateUserControllers } from './controllers/AuthenticateUserControllers';
import { CreateMessageControllers } from './controllers/CreateMessageControllers';
import { GetLast3MessagesControllers } from './controllers/GetLast3MessagesControllers';
import { ProfileUserControllers } from './controllers/ProfileUserControllers';
import { ensureAuthenticated } from './middleware/ensureAuthenticated';

const router = Router();

router.post('/authenticate', new AuthenticateUserControllers().handle);

router.post('/messages', ensureAuthenticated, new CreateMessageControllers().handle);

router.get('/messages/last3', new GetLast3MessagesControllers().handle)

router.get('/profile', ensureAuthenticated, new ProfileUserControllers().handle);

export { router }