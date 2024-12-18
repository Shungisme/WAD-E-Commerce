import { Router } from 'express';
import ProductCategoryController from '../controllers/product-category.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', ProductCategoryController.getAllProductCategories);
router.get('/:id', ProductCategoryController.getProductCategoryById);
router.post('/create', isAuthorized, isAdmin, ProductCategoryController.createProductCategory);
router.patch('/update/:id', isAuthorized, isAdmin, ProductCategoryController.updateProductCategory);
router.delete('/delete/:id', isAuthorized, isAdmin, ProductCategoryController.deleteProductCategory);

export default router; 