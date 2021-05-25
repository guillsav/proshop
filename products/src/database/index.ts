import { MongoClient } from 'mongodb';
import { config } from '../config';
import { Database, Product, Review } from '../lib';

export const connectDatabase = async (): Promise<Database | undefined> => {
  try {
    const client = await MongoClient.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    const db = client.db('main');

    return {
      products: db.collection<Product>('products'),
      reviews: db.collection<Review>('reviews')
    };
  } catch (error) {
    console.log(error);
  }
};
