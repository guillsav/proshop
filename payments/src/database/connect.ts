import mongoose from 'mongoose';
import { config } from '../config';
import { Database, Order, Product } from '../lib';

export const connectDatabase = async (): Promise<Database | undefined> => {
  try {
    const {
      connection: { db }
    } = await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.info(`\nConnected to MongoDB 🔌🔌🔌`);

    return {
      orders: db.collection<Order>('orders'),
      products: db.collection<Product>('products')
    };
  } catch (error) {
    console.error(error);
    console.info(`\n❗❗❗🚨🚨 Failed to Connected to MongoDB 🚨🚨❗❗❗`);
  }
};