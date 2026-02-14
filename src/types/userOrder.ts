export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  ratingsQuantity: number;
  subcategory: string[];
}

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface ShippingAddress {
  details: string;
  city: string;
  phone: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface UserOrder {
  _id: string;
  id: number;
  cartItems: CartItem[];
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
  shippingAddress: ShippingAddress;
  user: User;
}
