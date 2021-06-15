import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderProduct } from '../lib';
import { OrderStatus } from '../events';

export interface OrderAttrs {
  userId: string;
  products: OrderProduct[];
  price: number;
  status: OrderStatus;
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  products: OrderProduct[];
  price: number;
  status: OrderStatus;
  version: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        image: { type: String },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        quantity: { type: Number, required: true, default: 0 },
        version: { type: Number, required: true }
      }
    ],
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'CREATED',
      required: true
    }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      }
    },
    timestamps: true
  }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => new Order(attrs);

const Order = mongoose.model<OrderDoc, OrderModel>('orders', orderSchema);

export default Order;
