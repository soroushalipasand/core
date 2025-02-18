import { Router } from 'express';
import { addPermissionToRole, updatePermissionsForRole, deletePermissionFromRole } from '../../../../controllers/Auth/RolePermissionController';
const router = Router();
router.post(
    '/create',
    addPermissionToRole,
);
router.put(
    '/edit',
    updatePermissionsForRole,
);
router.delete(
    '/delete',
    deletePermissionFromRole,
);
export default router;

