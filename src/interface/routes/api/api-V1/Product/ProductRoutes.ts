import { Router } from 'express';
import {
  getAllProduct,
  getProduct,
} from '../../../../controllers/Product/ProductController';

const router = Router();
//products
router.get('/getall', getAllProduct);
router.get('/get/:productId', getProduct);

export default router;
