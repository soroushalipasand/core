import { Router } from 'express';
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  addcategoryImage,
} from '../../../../controllers/Product/CategoryController';
import multer from 'multer';
const upload = multer(); // Configure multer if needed
const router = Router();
router.get('/getall', getAllCategories);
router.post('/add-image', upload.single('file'), addcategoryImage);
router.post('/create', createCategory);
router.put('/edit', updateCategory);
router.delete('/delete', deleteCategory);
export default router;
