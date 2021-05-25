import { connectDatabase } from '../src/database';

const clear = async () => {
  try {
    console.log('[clear] : running...');

    const db = await connectDatabase();

    const products = await db.products.find({}).toArray();

    if (products.length > 0) await db.products.drop();

    console.log('[clear] : success');
  } catch {
    throw new Error('failed to clear database');
  }
};

clear();
