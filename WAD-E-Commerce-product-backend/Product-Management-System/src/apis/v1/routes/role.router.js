import { Router } from 'express';
import RoleController from '../controllers/role.controller.js';
import { isAuthorized } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/role.middleware.js';

const router = Router();

router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/create', isAuthorized, isAdmin, RoleController.createRole);
router.patch('/update/:id', isAuthorized, isAdmin, RoleController.updateRole);
router.delete('/delete/:id', isAuthorized, isAdmin, RoleController.deleteRole);

export default router;