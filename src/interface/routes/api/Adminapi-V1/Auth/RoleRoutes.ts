import { Router } from 'express';
import {
  getAllRoles,
  createRole,
  getRoleById,
  updateRole,
  deleteRole,
} from '../../../../controllers/Auth/RoleController';
import { showValidator } from '../../../Schema/Validator';
import { authValidator } from '../../../../../application/middleware/authValidator';
const router = Router();
router.get(
  '/getall',
  // showValidator,
  // authValidator('Change_all_user'),
  getAllRoles,
);
router.get(
  '/get/:roleId',
  showValidator,
  authValidator('Change_all_user'),
  getRoleById,
);
router.post(
  '/create',
  showValidator,
  authValidator('Change_all_user'),
  createRole,
);
router.put(
  '/edit',
  showValidator,
  authValidator('Change_all_user'),
  updateRole,
);
router.delete(
  '/delete',
  showValidator,
  authValidator('Change_all_user'),
  deleteRole,
);
export default router;
