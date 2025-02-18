import ProductVariant from './ProductVariant';
import ProductCategory from './Category';
import OrderItem from '../Order/OrderItem';

export default class Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  slug: string | null;
  active: boolean;
  imageUrl: string | null;
  imageUrls: string[] = []; // Array of image URLs
  categories?: ProductCategory[];
  variants?: ProductVariant[];
  orderItems?: OrderItem[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    name: string,
    description: string | null,
    price: number,
    sku: string,
    slug: string | null,
    active: boolean = true,
    imageUrl: string | null = null,
    imageUrls: string[] = [],
    categories: ProductCategory[] = [], // Default empty array
    variants: ProductVariant[] = [], // Default empty array
    orderItems: OrderItem[] = [], // Default empty array
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.sku = sku;
    this.slug = slug;
    this.active = active;
    this.imageUrl = imageUrl;
    this.imageUrls = imageUrls;
    this.categories = categories;
    this.variants = variants;
    this.orderItems = orderItems;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
