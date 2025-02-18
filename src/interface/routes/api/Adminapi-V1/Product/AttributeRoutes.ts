import { Router } from 'express';
import {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from '../../../../controllers/Product/AttributeController';
const router = Router();
router.get('/getall', getAllAttributes);
router.post('/create', createAttribute);
router.put('/edit', updateAttribute);
router.delete('/delete', deleteAttribute);
export default router;
