import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refreshToken);
router.get('/current-user', isAuthorized, UserController.getCurrentUser);

export default router;