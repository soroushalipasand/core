import { PrismaClient } from '@prisma/client';
import Order from '../../domain/models/Order/Order';
import OrderItem from '../../domain/models/Order/OrderItem';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
const prisma = new PrismaClient();

export default class PrismaOrderRepository {
  async create(order: Order): Promise<Order> {
    const createdOrder = await prisma.$transaction(async (tx) => {
      // Create the order
      const reservedUntil = new Date();
      reservedUntil.setMinutes(reservedUntil.getMinutes() + 1);

      const created = await tx.order.create({
        data: {
          userId: order.userId,
          status: order.status,
          totalPrice: order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
          addressLine: order.addressLine,
          city: order.city,
          state: order.state,
          postalCode: order.postalCode,
          country: order.country,
          discountId: order.discountId,
          reservedUntil: reservedUntil,
        },
      });

      // Create OrderItems in bulk
      if (order.items.length > 0) {
        await tx.orderItem.createMany({
          data: order.items.map((item) => ({
            orderId: created.id,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.price,
          })),
        });
      }
      const totalAmount = order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      // Set due date (e.g., 30 days from now)
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);

      // Create the invoice
      await tx.invoice.create({
        data: {
          id: uuidv4(), // Generate a unique ID for the invoice
          orderId: created.id,
          totalAmount: totalAmount,
          status: 'Pending',
          dueDate: dueDate,
        },
      });

      return created;
    });

    // Transform Prisma result into domain models
    // return this.transformToDomainModel(createdOrder);
    return new Order(
      createdOrder.id,
      createdOrder.userId,
      createdOrder.status,
      createdOrder.totalPrice,
      createdOrder.addressLine,
      createdOrder.city,
      createdOrder.state,
      createdOrder.postalCode,
      createdOrder.country,
      [], // Since items are createdOrder via createMany, we don't include them here
      createdOrder.discountId,
    );
  }

  // Helper function to transform Prisma data into domain model
  // private transformToDomainModel(created: any): Order {

  // }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    });

    return order
      ? order.items.map(
          (item) =>
            new OrderItem(
              item.id,
              item.orderId,
              item.variantId,
              item.quantity,
              item.price,
            ),
        )
      : [];
  }
  async findById(orderId: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) return null;

    return new Order(
      order.id,
      order.userId,
      order.status,
      order.totalPrice,
      order.addressLine,
      order.city,
      order.state,
      order.postalCode,
      order.country,
      order.items.map(
        (item) =>
          new OrderItem(
            item.id,
            item.orderId,
            item.variantId,
            item.quantity,
            item.price,
          ),
      ),
      order.discountId,
    );
  }

  async cleanUpExpiredOrders(): Promise<void> {
    console.log('Running cleanup job via repository at', new Date());

    const expiredOrders = await prisma.order.findMany({
      where: {
        status: 'Pending',
        reservedUntil: {
          lte: new Date(),
        },
      },
      include: { items: true, invoice: true },
    });

    for (const order of expiredOrders) {
      // Rollback inventory
      for (const item of order.items) {
        await prisma.inventory.update({
          where: { variantId: item.variantId },
          data: {
            reserved: { decrement: item.quantity },
          },
        });
      }

      // Delete the associated invoice (if exists)
      if (order.invoice) {
        await prisma.invoice.delete({
          where: { id: order.invoice.id },
        });
        console.log(`Deleted invoice for order ${order.id}.`);
      }

      // Update the order status to "Canceled"
      await this.updateOrderStatus(order.id, 'Canceled');
      console.log(`Updated order ${order.id} status to "Canceled".`);
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }
}
