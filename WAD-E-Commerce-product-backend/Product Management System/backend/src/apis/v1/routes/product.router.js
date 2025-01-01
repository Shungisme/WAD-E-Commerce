import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/create', ProductController.createProduct);
router.patch('/update/:id', ProductController.updateProduct);
router.delete('/delete/:id', ProductController.deleteProduct);

export default router; 