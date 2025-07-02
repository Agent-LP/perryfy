
export interface ProductVariant {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  productCount: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
  isActive: boolean;
} 