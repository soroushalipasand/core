import { Router } from 'express';
import {
  getAllVariant,
  createVariant,
  updateVariant,
  deleteVariant,
} from '../../../../controllers/Product/VariantController';
const router = Router();
router.get('/getall', getAllVariant);
router.post('/create', createVariant);
router.put('/edit', updateVariant);
router.delete('/delete', deleteVariant);
export default router;
