import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.patch('/update/:id', isAuthorized, isAdmin, UserController.updateUser);
router.patch('/update-profile/:id', isAuthorized, UserController.updateProfile);
router.post('/change-password', isAuthorized, UserController.changePassword);
router.post('/reset-password', UserController.resetPassword);
router.post('/logout', UserController.logout);
router.post('/refresh', UserController.refreshToken);
router.get('/current-user', isAuthorized, UserController.getCurrentUser);
router.get('/users', isAuthorized, isAdmin, UserController.getAllUsers);
router.post('/delete/:id', isAuthorized, isAdmin, UserController.deleteUser);

export default router;