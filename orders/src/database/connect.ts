import mongoose from 'mongoose';
import { config } from '../config';
import { Database, Product, Review } from '../lib';

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
      products: db.collection<Product>('products'),
      reviews: db.collection<Review>('reviews')
    };
  } catch (error) {
    console.error(error);
    console.info(`\n❗❗❗🚨🚨 Failed to Connected to MongoDB 🚨🚨❗❗❗`);
  }
};
