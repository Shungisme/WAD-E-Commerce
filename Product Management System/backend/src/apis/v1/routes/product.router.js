import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', ProductController.getAllProducts);
router.get('/slug/:slug', ProductController.getProductBySlug);
router.get('/id/:id', ProductController.getProductById);
router.post('/create', isAuthorized, isAdmin, ProductController.createProduct);
router.patch('/update/:id', isAuthorized, isAdmin, ProductController.updateProduct);
router.delete('/delete/:id', isAuthorized, isAdmin, ProductController.deleteProduct);

export default router; 