import Invoice from '../models/Order/Invoice';
import InvoiceRepository from '../repositories/InvoiceRepository';
import OrderRepository from '../repositories/OrderRepository';
import OrderItem from '../models/Order/OrderItem';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs

export default class InvoiceService {
  private invoiceRepo: InvoiceRepository;
  private orderRepo: OrderRepository;

  constructor(invoiceRepo: InvoiceRepository, orderRepo: OrderRepository) {
    this.invoiceRepo = invoiceRepo;
    this.orderRepo = orderRepo;
  }

  async createInvoiceForOrder(orderId: string): Promise<Invoice> {
    const order = await this.orderRepo.findById(orderId);
    if (!order) throw new Error('Order not found');

    // The items field should now be available, since it's part of the `Order` model
    const totalAmount = order.items.reduce((sum: number, item: OrderItem) => {
      return sum + item.price * item.quantity;
    }, 0);

    const dueDate = new Date(new Date().setDate(new Date().getDate() + 30)); // 30 days from now

    const invoice = new Invoice(
      uuidv4(),
      orderId,
      totalAmount,
      'Pending',
      dueDate,
    );
    return await this.invoiceRepo.create(invoice);
  }
}
