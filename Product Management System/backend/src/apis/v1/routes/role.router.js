import { Router } from 'express';
import RoleController from '../controllers/role.controller.js';
const router = Router();

router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/create', RoleController.createRole);
router.patch('/update/:id', RoleController.updateRole);
router.delete('/delete/:id', RoleController.deleteRole);

export default router;