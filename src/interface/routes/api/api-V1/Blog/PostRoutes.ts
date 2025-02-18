import { Router } from 'express';
import { getAllPosts } from '../../../../controllers/Blog/PostController';
const router = Router();
router.get('/getall', getAllPosts);
// router.post('/create', createCategory);
// router.put('/edit/:id', updateCategory);
// router.delete('/delete/:id', deleteCategory);
export default router;
