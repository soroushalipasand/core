import { Router } from 'express';
import {
  getAllProduct,
  createProduct,
  addProductMainImage,
  addImageGallery,
  removeImageGallery,
  updateProduct,
  getProduct,
  deleteProduct,
} from '../../../../controllers/Product/ProductController';
import multer from 'multer';
const upload = multer(); // Configure multer if needed
const router = Router();
//products
router.get('/getall', getAllProduct);
router.post('/create', createProduct);
router.get('/get/:productId', getProduct);
router.post('/add-image', upload.single('file'), addProductMainImage);
router.post('/add-gallery', upload.single('file'), addImageGallery);
router.post('/remove-gallery', removeImageGallery);
router.put('/edit', updateProduct);
router.delete('/delete', deleteProduct);
export default router;
