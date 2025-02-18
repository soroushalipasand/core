import { Request, Response } from 'express';
import OrderService from '../../../domain/services/OrderService';
import PrismaOrderRepository from '../../../infrastructure/prisma/PrismaOrderRepository';
import PrismaInventoryRepository from '../../../infrastructure/prisma/PrismaInventoryRepository';
import PrismaInvoiceRepository from '../../../infrastructure/prisma/PrismaInvoiceRepository';

const orderService = new OrderService(
  new PrismaOrderRepository(),
  new PrismaInventoryRepository(),
  new PrismaInvoiceRepository(),
);

export const createOrder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const {
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
  } = req.body;

  try {
    // console.log(req.body);
    // return true;
    const newOrder = await orderService.createOrder(
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

    return res.json({
      message: 'Order created successfully.',
      success: true,
      orderId: newOrder.id,
    });
  } catch (error: unknown) {
    // Explicitly type the error as an instance of Error
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: 'Failed to create order due to an unknown error.',
        success: false,
      });
    }
  }
};

// For finalizing and canceling orders
export const finalizeOrder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await orderService.finalizeOrder(req.params.orderId);
    return res.json({
      message: 'Order finalized successfully.',
      success: true,
    });
  } catch (error) {
    console.error('Error finalizing order:', error);
    return res.status(500).json({
      message: 'Failed to finalize order.',
      success: false,
    });
  }
};

export const cancelOrder = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    await orderService.cancelOrder(req.params.orderId);
    return res.json({ message: 'Order canceled successfully.', success: true });
  } catch (error) {
    console.error('Error canceling order:', error);
    return res.status(500).json({
      message: 'Failed to cancel order.',
      success: false,
    });
  }
};
