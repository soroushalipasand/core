export default class Inventory {
  id: string;
  variantId: string;
  stock: number;
  reserved: number;

  constructor(id: string, variantId: string, stock: number, reserved: number) {
    this.id = id;
    this.variantId = variantId;
    this.stock = stock;
    this.reserved = reserved;
  }
}
