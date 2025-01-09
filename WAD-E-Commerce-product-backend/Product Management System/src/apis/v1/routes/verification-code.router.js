import { Router } from 'express';
import VerificationCodeController from '../controllers/verification-code.controller.js';

const router = Router();

router.post('/', VerificationCodeController.sendVerificationCode);

export default router;