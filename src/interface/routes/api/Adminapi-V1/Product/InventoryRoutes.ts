// src/interface/routes/inventoryRoutes.ts
import express from 'express';
import {
  checkAndUpdateInventory,
  createInventory,
  getAllInventories,
} from '../../../../controllers/Product/InventoryController';

const router = express.Router();
router.get('/getall', getAllInventories);
router.post('/update', checkAndUpdateInventory);
router.post('/create', createInventory);
export default router;
