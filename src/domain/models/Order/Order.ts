import OrderItem from './OrderItem';

export default class Order {
  id: string;
  userId: string;
  status: string; // E.g., "Pending", "Shipped", etc.
  totalPrice: number;
  discountId?: string | null;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: OrderItem[]; // This needs to be here
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    userId: string,
    status: string,
    totalPrice: number,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    items: OrderItem[], // Include items in the constructor
    discountId?: string | null,
  ) {
    this.id = id;
    this.userId = userId;
    this.status = status;
    this.totalPrice = totalPrice;
    this.addressLine = addressLine;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.items = items; // Make sure to assign items here
    this.discountId = discountId;
  }
}
