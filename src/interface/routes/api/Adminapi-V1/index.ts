import { Router } from 'express';
import authRoutes from './Auth/AuthRoutes';
import roleRoutes from './Auth/RoleRoutes';
import permissionRoutes from './Auth/PermissionRoutes';
import rolePermissionRoutes from './Auth/RolePermissionRoutes';
import productRoutes from './Product/ProductRoutes';
import categoryRoutes from './Product/CategoryRoutes';
import attributeRoutes from './Product/AttributeRoutes';
import attributeValueRoutes from './Product/AttributeValueRoutes';
import variantRoutes from './Product/VariantRoutes';
import inventoryRoutes from './Product/InventoryRoutes';

const router = Router();

// Mount individual routes
router.use('/auth', authRoutes); // Routes for authentication
router.use('/role', roleRoutes); // Routes for authentication
router.use('/permission', permissionRoutes); // Routes for authentication
router.use('/rolepermission', rolePermissionRoutes); // Routes for authentication
router.use('/product', productRoutes); // Routes for authentication
router.use('/category', categoryRoutes); // Routes for authentication
router.use('/attribute', attributeRoutes); // Routes for authentication
router.use('/attributevalue', attributeValueRoutes); // Routes for authentication
router.use('/variant', variantRoutes); // Routes for authentication
router.use('/inventory', inventoryRoutes); // Routes for authentication

export default router;
