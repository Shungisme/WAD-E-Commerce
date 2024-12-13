import { Router } from 'express';
import ProductCategoryController from '../controllers/product-category.controller.js';

const router = Router();

router.get('/', ProductCategoryController.getAllProductCategories);
router.get('/:id', ProductCategoryController.getProductCategoryById);
router.post('/create', ProductCategoryController.createProductCategory);
router.patch('/update/:id', ProductCategoryController.updateProductCategory);
router.delete('/delete/:id', ProductCategoryController.deleteProductCategory);

export default router; 