import { OrderItem } from 'global';
import Inventory from '../models/Order/Inventory';

export default interface InventoryRepository {
  findAll(
    page: number,
    pageSize: number,
  ): Promise<{ inventories: Inventory[]; total: number }>;

  create(inventory: Inventory): Promise<Inventory>;

  /**
   * Update the stock for a specific product variant.
   * @param variantId - The unique ID of the product variant.
   * @param quantity - The quantity to decrement from the stock.
   * @returns A promise that resolves when the stock has been updated.
   */
  updateStock(variantId: string, quantity: number): Promise<void>;

  /**
   * Retrieve the current stock and reservation status for a specific product variant.
   * @param variantId - The unique ID of the product variant.
   * @returns A promise that resolves to the inventory object or null if not found.
   */
  getStock(variantId: string): Promise<Inventory | null>;

  /**
   * Reserve stock for a specific product variant.
   * @param variantId - The unique ID of the product variant.
   * @param quantity - The quantity to reserve from the available stock.
   * @returns A promise that resolves when the stock has been reserved.
   * @throws Error if there is insufficient stock to reserve.
   */
  reserveStock(
    variantId: string,
    quantity: number,
    price: number,
  ): Promise<void>;

  /**
   * Finalize the order by deducting stock and reserved quantity for the ordered items.
   * @param orderItems - An array of order items with variantId and quantity.
   * @returns A promise that resolves when the stock and reservation have been updated.
   */
  finalizeOrder(orderItems: OrderItem[]): Promise<void>;

  /**
   * Cancel the reservation of stock for specific order items.
   * @param orderItems - An array of order items with variantId and quantity to cancel reservation for.
   * @returns A promise that resolves when the reservation has been released.
   */
  cancelReservation(orderItems: OrderItem[]): Promise<void>;
}
