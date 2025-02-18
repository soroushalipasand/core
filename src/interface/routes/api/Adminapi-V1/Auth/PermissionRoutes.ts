import { Router } from 'express';
import {
  allPermissions,
  createPermission,
  deletePermission,
  getPermissionById,
  updatePermission,
} from '../../../../controllers/Auth/PermissionController';
import { showValidator } from '../../../Schema/Validator';
import { authValidator } from '../../../../../application/middleware/authValidator';
const router = Router();
//Permisions
router.get(
  '/getall',
  showValidator,
  authValidator('Get_PERMISSION_LIST'),
  allPermissions,
);
router.get(
  '/get/:roleId',
  showValidator,
  authValidator('Get_PERMISSION_DETAIL'),
  getPermissionById,
);
router.post(
  '/create',
  showValidator,
  authValidator('ADD_PERMISSION'),
  createPermission,
);
router.put(
  '/edit',
  showValidator,
  authValidator('EDIT_PERMISSION'),
  updatePermission,
);
router.delete(
  '/delete',
  showValidator,
  authValidator('DELETE_PERMISSION'),
  deletePermission,
);
export default router;
