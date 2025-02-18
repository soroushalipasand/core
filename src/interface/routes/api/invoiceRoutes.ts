// src/interface/routes/invoiceRoutes.ts
import express from 'express';
import { createInvoiceForOrder } from '../../../interface/controllers/Auth/InvoiceController';

const router = express.Router();

router.post('/create', createInvoiceForOrder);

export default router;
