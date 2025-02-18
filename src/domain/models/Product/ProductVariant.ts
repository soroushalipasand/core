import Inventory from '../Order/Inventory';
import AttributeValue from './AttributeValue';
import { Discount } from './Discount';
import Product from './Product';

export default class ProductVariant {
  id: string;
  productId: string;
  sizeId: string | null;
  colorId: string | null;
  price: number | null;
  sku: string;
  size?: AttributeValue | null;
  color?: AttributeValue | null;
  product?: Product;
  discounts?: Discount[];
  Inventory?: Inventory;

  constructor(
    id: string,
    productId: string,
    sizeId: string | null,
    colorId: string | null,
    price: number | null,
    sku: string,
    size?: AttributeValue | null,
    color?: AttributeValue | null,
    product?: Product,
    discounts?: Discount[],
    Inventory?: Inventory,
  ) {
    this.id = id;
    this.productId = productId;
    this.sizeId = sizeId;
    this.colorId = colorId;
    this.price = price;
    this.sku = sku;
    this.size = size;
    this.color = color;
    this.product = product;
    this.discounts = discounts;
    this.Inventory = Inventory;
  }
}
