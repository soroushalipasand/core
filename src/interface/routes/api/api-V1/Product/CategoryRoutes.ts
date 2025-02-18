import { Router } from 'express';
import {
  getAllCategories,
  //   createCategory,
  //   updateCategory,
  //   deleteCategory,
} from '../../../../controllers/Product/CategoryController';
const router = Router();
router.get('/getall', getAllCategories);
// router.post('/create', createCategory);
// router.put('/edit/:id', updateCategory);
// router.delete('/delete/:id', deleteCategory);
export default router;
