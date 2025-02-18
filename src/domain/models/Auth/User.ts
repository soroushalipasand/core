import { OriginalRole } from 'global';
import Order from '../Order/Order'; // Import Order model
import UserAddress from './UserAddress'; // Import UserAddress model

export default class User {
  id: string;
  mobile: string;
  hasPassword: boolean;
  roleId: string;
  isAdmin: boolean;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  role?: OriginalRole;
  addresses?: UserAddress[]; // New relation to UserAddress
  orders?: Order[]; // New relation to Order
  AccessToken?: string;
  RefreshToken?: string;

  constructor(
    id: string,
    mobile: string,
    hasPassword: boolean,
    roleId: string,
    isAdmin: boolean = false,
    password?: string | null,
    firstName?: string | null,
    lastName?: string | null,
    email?: string | null,
    role?: OriginalRole,
    addresses?: UserAddress[], // Optional array of addresses
    orders?: Order[], // Optional array of orders
    AccessToken?: string,
    RefreshToken?: string,
  ) {
    this.id = id;
    this.mobile = mobile;
    this.hasPassword = hasPassword;
    this.roleId = roleId;
    this.isAdmin = isAdmin;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.addresses = addresses;
    this.orders = orders;
    this.AccessToken = AccessToken;
    this.RefreshToken = RefreshToken;
  }
}
