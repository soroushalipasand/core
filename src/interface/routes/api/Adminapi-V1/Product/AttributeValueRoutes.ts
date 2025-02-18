import { Router } from 'express';
import {
  getAllAttributeValues,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from '../../../../controllers/Product/AttributeValueController';
const router = Router();
router.get('/getall', getAllAttributeValues);
router.post('/create', createAttributeValue);
router.put('/edit/:id', updateAttributeValue);
router.delete('/delete', deleteAttributeValue);
export default router;
