import { MongoClient } from 'mongodb';
import { config } from '../config';
import { Database, User } from '../lib';

export const connectDatabase = async (): Promise<Database | undefined> => {
  try {
    const client = await MongoClient.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    const db = client.db('main');

    return {
      users: db.collection<User>('users')
    };
  } catch (error) {
    console.log(error);
  }
};
