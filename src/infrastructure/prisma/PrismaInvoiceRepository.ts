// src/infrastructure/prisma/PrismaInvoiceRepository.ts
import { PrismaClient } from '@prisma/client';
import Invoice from '../../domain/models/Order/Invoice';
import InvoiceRepository from '../../domain/repositories/InvoiceRepository';

const prisma = new PrismaClient();

export default class PrismaInvoiceRepository implements InvoiceRepository {
  async create(invoice: Invoice): Promise<Invoice> {
    const createdInvoice = await prisma.invoice.create({
      data: {
        orderId: invoice.orderId,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        dueDate: invoice.dueDate,
      },
    });
    return new Invoice(
      createdInvoice.id,
      createdInvoice.orderId,
      createdInvoice.totalAmount,
      createdInvoice.status,
      createdInvoice.dueDate,
    );
  }

  async updateStatus(invoiceId: string, status: string): Promise<Invoice> {
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: { status },
    });
    return new Invoice(
      updatedInvoice.id,
      updatedInvoice.orderId,
      updatedInvoice.totalAmount,
      updatedInvoice.status,
      updatedInvoice.dueDate,
    );
  }
}
