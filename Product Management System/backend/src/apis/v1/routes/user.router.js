import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refreshToken);

export default router;