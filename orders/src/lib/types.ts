import { Collection, ObjectId } from 'mongodb';
import { OrderStatus } from '../events';
import { ProductDoc } from '../model';

export interface Order {
  _id?: ObjectId;
  userId: string;
  products: [ProductDoc];
  price: number;
  status: OrderStatus;
  version?: number;
}

export interface UpdateOrderAttrs {
  _id?: ObjectId;
  userId?: string;
  products?: [ProductDoc];
  price?: number;
  status?: OrderStatus;
  version?: number;
}

export interface Product {
  _id?: ObjectId;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  version?: number;
}

export interface UpdateProductAttrs {
  name?: string;
  image?: string;
  description?: string;
  brand?: string;
  category?: string;
  price?: number;
  countInStock?: number;
}

export interface Database {
  orders: Collection<Order>;
  products: Collection<Product>;
}

export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number;
  quantity: number;
  version: number;
}
