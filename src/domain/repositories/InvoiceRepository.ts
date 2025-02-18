// src/domain/repositories/InvoiceRepository.ts
import Invoice from '../models/Order/Invoice';

export default interface InvoiceRepository {
  create(invoice: Invoice): Promise<Invoice>;
  updateStatus(invoiceId: string, status: string): Promise<Invoice>;
}
