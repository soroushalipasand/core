// src/domain/repositories/AttributeRepository.ts
import OrderItem from '../models/Order/OrderItem';
import Order from '../models/Order/Order';

export default interface OrderRepository {
  // findById(orderId: string): unknown;
  // getAll(): Promise<OrderItem[]>;
  create(newOrder: Order): Promise<Order>;
  // update(id: string, attribute: OrderItem): Promise<OrderItem>;
  // delete(id: string): Promise<void>;
  // findById(id: string): Promise<OrderItem | null>;
  findById(orderId: string): Promise<Order | null>; // Define findById to return a Promise<Order | null>
  getOrderItems(orderId: string): Promise<OrderItem[]>;
}
