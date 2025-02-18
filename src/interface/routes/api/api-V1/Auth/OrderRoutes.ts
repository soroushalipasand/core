import { Router } from 'express';
import { createOrder } from '../../../../../interface/controllers/Auth/OrderController';
// import { addPermissionToRole, updatePermissionsForRole, deletePermissionFromRole } from '../../../../controllers/Auth/RolePermissionController';
const router = Router();
router.post('/create', createOrder);
// router.put(
//     '/edit',
//     updatePermissionsForRole,
// );
// router.delete(
//     '/delete',
//     deletePermissionFromRole,
// );
export default router;
