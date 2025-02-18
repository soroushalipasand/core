// src/domain/services/orerService.ts
import OrderRepository from '../repositories/OrderRepository';
import InventoryRepository from '../repositories/InventoryRepository';

import Order from '../models/Order/Order';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
import OrderItem from '../models/Order/OrderItem';
import InvoiceRepository from '../repositories/InvoiceRepository';

export default class OrderService {
  private orderRepo: OrderRepository;
  private inventoryRepo: InventoryRepository;
  private invoiceRepo: InvoiceRepository;
  constructor(
    orderRepo: OrderRepository,
    inventoryRepo: InventoryRepository,
    invoiceRepo: InvoiceRepository,
  ) {
    this.orderRepo = orderRepo;
    this.inventoryRepo = inventoryRepo;
    this.invoiceRepo = invoiceRepo;
  }

  // Get all permissions
  // async getAllPermissions(): Promise<OrderItem[]> {
  //     return await this.orderRepo.getAll();
  // }

  // Create a new permission
  async createOrder(
    userId: string,
    status: string,
    totalPrice: number,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    items: OrderItem[],
    discountId?: string,
  ): Promise<Order> {
    // First, reserve inventory for the order items
    try {
      for (const item of items) {
        await this.inventoryRepo.reserveStock(
          item.variantId,
          item.quantity,
          item.price,
        );
      }

      // Now create the order
      const newOrder = new Order(
        uuidv4(),
        userId,
        status,
        totalPrice,
        addressLine,
        city,
        state,
        postalCode,
        country,
        items,
        discountId,
      );

      // Save the order to the repository
      const createdOrder = await this.orderRepo.create(newOrder);

      return createdOrder;
    } catch (error: unknown) {
      // Explicitly type the error as an instance of Error
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('An unknown error occurred during order creation.');
      }
    }
  }

  // Finalize an order (on successful payment)
  async finalizeOrder(orderId: string): Promise<void> {
    const orderItems = await this.orderRepo.getOrderItems(orderId);

    // Finalize stock for each item in the order
    await this.inventoryRepo.finalizeOrder(orderItems);
  }

  // Cancel an order (on payment failure)
  async cancelOrder(orderId: string): Promise<void> {
    const orderItems = await this.orderRepo.getOrderItems(orderId);

    // Release reserved stock
    await this.inventoryRepo.cancelReservation(orderItems);
  }
}
