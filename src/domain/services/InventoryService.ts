// src/domain/services/InventoryService.ts
import Inventory from '../../domain/models/Order/Inventory';
import InventoryRepository from '../repositories/InventoryRepository';
import { v4 as uuidv4 } from 'uuid'; // For generating UUIDs
export default class InventoryService {
  private inventoryRepository: InventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }
  async getAllInventory(
    page: number,
    pageSize: number,
  ): Promise<{ inventories: Inventory[]; total: number }> {
    const { inventories, total } = await this.inventoryRepository.findAll(
      page,
      pageSize,
    );
    return { inventories, total };
  }

  async createInventory(
    variantId: string,
    stock: number,
    reserved: number,
  ): Promise<Inventory> {
    const category = new Inventory(uuidv4(), variantId, stock, reserved); // ID is auto-generated
    return this.inventoryRepository.create(category);
  }

  async checkAndUpdateInventory(
    productId: string,
    quantity: number,
  ): Promise<void> {
    const inventory = await this.inventoryRepository.getStock(productId);
    if (!inventory || inventory.stock < quantity) {
      throw new Error(`Not enough stock for product ${productId}`);
    }

    await this.inventoryRepository.updateStock(productId, quantity);
  }
}
