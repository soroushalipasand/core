import { Router } from 'express';
// import { createOrder } from '../../../../controllers/Auth/OrderController';
import {
  AllAddresses,
  createAddress,
  updateAddress,
} from '../../../../controllers/Auth/AddressController';
import { ownershipValidator } from '../../../../../application/middleware/ownershipValidator';
// import { addPermissionToRole, updatePermissionsForRole, deletePermissionFromRole } from '../../../../controllers/Auth/RolePermissionController';
const router = Router();
router.get('/getall', AllAddresses);
router.post('/create', createAddress);
router.put('/edit', ownershipValidator(), updateAddress);
// router.delete(
//     '/delete',
//     deletePermissionFromRole,
// );
export default router;
