import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File; // Single file
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] }; // Multiple files (array or object with arrays of files)
    }
  }
}

export interface DecodedToken extends JwtPayload {
  user_mobile: string;
  User_role: {
    permissions: TransformedPermission[]; // Adjust this to your actual permission type
  };
}

export interface RegisterRequest extends Request {
  body: {
    mobile: string;
    password?: string;
    otpToken?: string;
    smsCode?: number;
    AccessToken?: string;
    RefreshToken?: string;
  };
}

// Original Permission type (from database)
export interface OriginalPermission {
  id: string;
  title: string;
  slug: string | null;
  active: boolean;
}

// Transformed Permission type (after transformation)
export interface TransformedPermission {
  permissionId: string;
  slug: string | null;
  permissionName: string;
}

// RolePermission interface (relationship between Role and Permission)
export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  permission: OriginalPermission; // Nested permission object
}

// Role interface (original data from database)
export interface OriginalRole {
  id: string;
  title: string;
  slug: string | null;
  active: boolean;
  permissions: RolePermission[]; // Array of RolePermission objects
}

// Transformed Role type (after transformation)
export interface TransformedRole {
  RoleId: string;
  roleName: string | null;
  permissions: TransformedPermission[]; // Transformed permissions
}

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  mobile: string;
  hasPassword: boolean;
  isAdmin: boolean;
  role: OriginalRole; // Allow role to be null
  addresses?: UserAddress[]; // New field for user addresses
  AccessToken?: string; // Optional
  RefreshToken?: string; // Optional
  token?: string;
}

// Transformed User interface (after transformation)
export interface TransformedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  mobile: string;
  hasPassword: boolean;
  role?: TransformedRole;
  AccessToken?: string; // Optional, depending on your logic
  RefreshToken?: string; // Optional, depending on your logic
}

export interface OtpPayload {
  mobile: string;
  code: number;
  iat: number;
  exp: number;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  variants?: ProductVariant[]; // Optional field for product variants
  categories?: ProductCategory[];
  orderItems?: OrderItem[]; // Optional field for product categories
  imageUrl?: string; // New optional field for image URL
}

export interface ProductVariant {
  id: string;
  productId: string;
  sizeId: string | null;
  colorId: string | null;
  price: number | null;
  stock: number;
  size?: AttributeValue | null; // Allow null for size
  color?: AttributeValue | null; // Allow null for color
  discounts?: Discount[]; // New field for applied discounts
}

export interface Discount {
  id: string;
  code: string;
  description?: string | null;
  percentage?: number | null; // Optional percentage discount
  fixedAmount?: number | null; // Optional fixed discount
  active: boolean;
  startDate?: string | null; // ISO string date
  endDate?: string | null; // ISO string date
}

export interface AttributeValue {
  id: string;
  value: string; // Size or color value
  attributeId: string;
}

export interface Attribute {
  id: string;
  name: string; // Attribute name (e.g., size, color)
}

export interface Category {
  id: string;
  title: string;
  faTitle: string;
  description: string | null;
  isActive: boolean;
  imageUrl?: string; // New optional field for image URL
}

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
  category: Category; // Nested category object
}

export interface UserAddress {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean; // Indicates if this is the default address
}

export interface Order {
  id: string;
  userId: string;
  status: string; // e.g., Pending, Shipped, Delivered
  totalPrice: number;
  discount?: Discount; // Optional discount applied to the order
  addressLine: string; // Snapshot of the address used
  city: string;
  state: string;
  postalCode: string;
  country: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  variantId: string; // Optional variant ID
  quantity: number;
  price: number; // Snapshot of the price at the time of order
  product?: Product; // Optional nested product object
  variant?: ProductVariant; // Optional nested variant object
}

export interface FeaturedMedia {
  source_url: string;
}

export interface WordpressPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  active: boolean;
  _embedded?: {
    'wp:featuredmedia'?: FeaturedMedia[];
  };
}
