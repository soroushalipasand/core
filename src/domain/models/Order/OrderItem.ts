export default class OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  price: number;
  // createdAt: Date;
  // updatedAt: Date;

  constructor(
    id: string,
    orderId: string,
    variantId: string, // No need for productId
    quantity: number,
    price: number,
  ) {
    this.id = id;
    this.orderId = orderId;
    this.variantId = variantId; // Just pass variantId
    this.quantity = quantity;
    this.price = price;
    // this.createdAt = new Date();
    // this.updatedAt = new Date();
  }
}
