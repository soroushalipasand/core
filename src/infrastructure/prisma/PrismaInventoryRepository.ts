// src/infrastructure/prisma/PrismaInventoryRepository.ts
import { PrismaClient } from '@prisma/client';
import Inventory from '../../domain/models/Order/Inventory';
import InventoryRepository from '../../domain/repositories/InventoryRepository';
import { OrderItem } from 'global';

const prisma = new PrismaClient();

export default class PrismaInventoryRepository implements InventoryRepository {
  async findAll(
    page: number,
    pageSize: number,
  ): Promise<{ inventories: Inventory[]; total: number }> {
    const [inventories, total] = await prisma.$transaction([
      prisma.inventory.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.inventory.count(),
    ]);
    // console.log(categories);

    return {
      inventories: inventories.map(
        (inventory) =>
          new Inventory(
            inventory.id,
            inventory.variantId,
            inventory.stock,
            inventory.reserved,
          ),
      ),
      total,
    };
  }
  async create(inventory: Inventory): Promise<Inventory> {
    const createdInventory = await prisma.inventory.create({
      data: {
        variantId: inventory.variantId,
        stock: inventory.stock,
        reserved: inventory.reserved,
      },
    });
    return new Inventory(
      createdInventory.id,
      createdInventory.variantId,
      createdInventory.stock,
      createdInventory.reserved,
    );
  }

  async updateStock(variantId: string, quantity: number): Promise<void> {
    await prisma.inventory.update({
      where: { variantId }, // Assuming variantId is unique
      data: { stock: { decrement: quantity } },
    });
  }

  async getStock(variantId: string): Promise<Inventory | null> {
    const inventory = await prisma.inventory.findUnique({
      where: { variantId },
    });
    if (inventory) {
      return new Inventory(
        inventory.id,
        inventory.variantId,
        inventory.stock,
        inventory.reserved,
      );
    }
    return null;
  }

  async reserveStock(
    variantId: string,
    quantity: number,
    price: number,
  ): Promise<void> {
    const inventory = await prisma.inventory.findUnique({
      where: { variantId },
      include: {
        variant: {
          include: {
            product: true, // Include the product details related to the variant
          },
        },
      },
    });

    if (!inventory || inventory.stock - inventory.reserved < quantity) {
      throw new Error(`موجودی ${inventory?.variant.product.name} کافی نیست.`);
    }
    if (inventory.variant.price !== price) {
      throw new Error(
        `قیمت  ${inventory.variant.product.name} به درستی وارد نشده است.`,
      );
    }

    await prisma.inventory.update({
      where: { variantId },
      data: {
        reserved: { increment: quantity },
      },
    });
  }

  // Finalize order (deduct stock and clear reserved stock)
  async finalizeOrder(orderItems: OrderItem[]): Promise<void> {
    for (const item of orderItems) {
      await prisma.inventory.update({
        where: { variantId: item.variantId },
        data: {
          stock: { decrement: item.quantity },
          reserved: { decrement: item.quantity },
        },
      });
    }
  }

  // Cancel reservation (release reserved stock)
  async cancelReservation(orderItems: OrderItem[]): Promise<void> {
    for (const item of orderItems) {
      await prisma.inventory.update({
        where: { variantId: item.variantId },
        data: {
          reserved: { decrement: item.quantity },
        },
      });
    }
  }
}
