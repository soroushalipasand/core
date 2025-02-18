// src/interface/controllers/InvoiceController.ts
import { Request, Response } from 'express';
import InvoiceService from '../../../domain/services/InvoiceService';
import PrismaInvoiceRepository from '../../../infrastructure/prisma/PrismaInvoiceRepository';
import PrismaOrderRepository from '../../../infrastructure/prisma/PrismaOrderRepository';

const invoiceService = new InvoiceService(
  new PrismaInvoiceRepository(),
  new PrismaOrderRepository(),
);

export const createInvoiceForOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const invoice = await invoiceService.createInvoiceForOrder(orderId);
    return res.json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'Failed to create permission.',
      success: false,
    });
  }
};
