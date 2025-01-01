import { Router } from 'express';
import OrderController from '../controllers/order.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', OrderController.getAllOrders);
router.get('/statistics', isAuthorized, isAdmin, OrderController.getStatistics);
router.get('/:id', OrderController.getOrderById);

router.post('/create', isAuthorized, OrderController.createOrder);
router.patch('/update/:id', isAuthorized, OrderController.updateOrder);
router.delete('/delete/:id', isAuthorized, OrderController.deleteOrder);

export default router; 