import { Collection, ObjectId } from 'mongodb';

export interface Order {
  _id?: ObjectId;
  status: OrderStatus;
  price: number;
  userId: string;
  version?: number;
}

export interface UpdateOrderAttrs {
  status?: OrderStatus;
  price?: number;
  userId?: string;
  version?: number;
}

export interface Payment {
  _id?: string;
  orderId: string;
  stripeId: string;
}

export interface CreatePaymenAtrrs {
  orderId: string;
  token: string;
}
export interface UpdatePaymentAttrs {
  orderId?: string;
  token?: string;
}

export interface Database {
  orders: Collection<Order>;
  payments: Collection<Payment>;
}

export interface UserDoc {
  id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export enum OrderStatus {
  CREATED = 'CREATED',
  CANCELLED = 'CANCELLED',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  COMPLETE = 'COMPLETE'
}
