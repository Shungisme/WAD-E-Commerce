import { Router } from 'express';
import OrderController from '../controllers/order.controller.js';

const router = Router();

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.post('/create', OrderController.createOrder);
router.patch('/update/:id', OrderController.updateOrder);
router.delete('/delete/:id', OrderController.deleteOrder);

export default router; 