import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import Product, { ProductDoc } from './product';
import { OrderStatus } from '../events';

export interface OrderAttrs {
  userId: string;
  products: [ProductDoc];
  price: number;
  status: OrderStatus;
}

export interface OrderDoc extends mongoose.Document {
  userId: string;
  products: [ProductDoc];
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
    // products: {
    //   type: [Product],
    //   required: true
    // },
    price: {
      type: Number,
      required: true
    }
    // status: {
    //   type: OrderStatus,
    //   required: true
    // }
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
