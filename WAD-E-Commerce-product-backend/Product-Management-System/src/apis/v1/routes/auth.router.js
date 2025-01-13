import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import passport from '../../../configs/passport.js';
const router = Router();

router.get('/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
		accessType: 'offline',
		prompt: 'consent'
	})
);
router.get(
	'/google/callback',
	passport.authenticate('google', { failureRedirect: '/login' }),
	AuthController.callBack
);
router.get('/current-user', isAuthenticated, AuthController.getCurrentUser);

export default router;