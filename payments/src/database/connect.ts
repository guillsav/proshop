import mongoose from 'mongoose';
import { config } from '../config';
import { Database, Order, Payment } from '../lib';

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
      payments: db.collection<Payment>('payments')
    };
  } catch (error) {
    console.error(error);
    console.info(`\n❗❗❗🚨🚨 Failed to Connected to MongoDB 🚨🚨❗❗❗`);
  }
};
