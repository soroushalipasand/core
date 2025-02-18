export default class UserAddress {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    userId: string,
    addressLine: string,
    city: string,
    state: string,
    postalCode: string,
    country: string,
    isDefault: boolean,
  ) {
    this.id = id;
    this.userId = userId;
    this.addressLine = addressLine;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.isDefault = isDefault;
  }
}
