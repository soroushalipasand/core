import { Router } from 'express';
import authRoutes from './Auth/AuthRoutes';
import productRoutes from './Product/ProductRoutes';
import orderRoutes from './Auth/OrderRoutes';
import categoryRoutes from './Product/CategoryRoutes';
import postRoutes from './Blog/PostRoutes';
import addressRoutes from './Auth/AddressRoutes';
const router = Router();
// Mount individual routes
router.use('/auth', authRoutes); // Routes for authentication
router.use('/product', productRoutes); // Routes for authentication
router.use('/category', categoryRoutes); // Routes for authentication
router.use('/order', orderRoutes); // Routes for authentication
router.use('/post', postRoutes); // Routes for authentication
router.use('/address', addressRoutes); // Routes for authentication
export default router;
