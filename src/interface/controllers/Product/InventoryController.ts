// src/interface/controllers/InventoryController.ts
import { Request, Response } from 'express';
import InventoryService from '../../../domain/services/InventoryService';
import PrismaInventoryRepository from '../../../infrastructure/prisma/PrismaInventoryRepository';
import { prismaErrorHandler } from '../../../infrastructure/globalErrorHandler';

const inventoryService = new InventoryService(new PrismaInventoryRepository());
export const getAllInventories = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const { inventories, total } = await inventoryService.getAllInventory(
      page,
      pageSize,
    );
    return res.status(200).json({
      data: {
        inventories,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
      message: null,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error retrieving categories.',
      success: false,
    });
  }
};

export const createInventory = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { variantId, stock, reserved } = req.body;
  try {
    const newInventory = await inventoryService.createInventory(
      variantId,
      stock,
      reserved,
    );
    return res.status(200).json({
      message: 'موجودی با موفقیت ایجاد شد.',
      success: true,
      data: newInventory,
    });
  } catch (error) {
    return prismaErrorHandler(error, res);
  }
};

export const checkAndUpdateInventory = async (req: Request, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    await inventoryService.checkAndUpdateInventory(productId, quantity);
    return res.json({ message: 'Inventory updated successfully' });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      message: 'Failed to create permission.',
      success: false,
    });
  }
};
