export interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
  brand: Brand;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Order {
  _id: string;
  user: User;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
}
