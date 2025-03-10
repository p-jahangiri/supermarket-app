// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  avatar?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: Category;
  inStock: boolean;
  quantity: number;
  unit: string; // e.g., kg, piece, liter
  rating?: number;
  reviews?: Review[];
  featured?: boolean;
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  image?: string;
  parentId?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

// Cart related types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

// Order related types
export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export enum PaymentMethod {
  CREDIT_CARD = "credit_card",
  DEBIT_CARD = "debit_card",
  CASH_ON_DELIVERY = "cash_on_delivery",
  ONLINE_PAYMENT = "online_payment",
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderSuccess: { orderId: string };
  OrderHistory: undefined;
  OrderDetails: { orderId: string };
  Profile: undefined;
  EditProfile: undefined;
  Categories: undefined;
  CategoryProducts: { categoryId: string };
  Search: undefined;
  About: undefined;
  Contact: undefined;
};
