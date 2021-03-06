import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app';
import { config } from '../config';
import { Token } from '../helpers';
import { ProductDoc, ReviewAttrs, ReviewDoc } from '../model';

interface IProduct {
  name: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  price: number;
}

declare global {
  namespace NodeJS {
    interface Global {
      signin(isAdmin?: boolean): string[];
      createProducts(
        prodAttrs: IProduct,
        total: number,
        cookie: string[]
      ): Promise<ProductDoc[]>;
      createReviews(
        reviewAttrs: ReviewAttrs,
        total: number,
        cookie: string[]
      ): Promise<ReviewDoc[]>;
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = new MongoMemoryServer();

  config.jwtKey = 'secret';

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (isAdmin?: boolean) => {
  /* Build a JWT payload. {id, email} */
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
    isAdmin: isAdmin ? isAdmin : false
  };

  /* Build up session object. {jwt: MY_JWT} */
  const token = Token.generateToken(
    payload.id,
    payload.email,
    payload.isAdmin,
    config.jwtKey
  );

  /* Build up session object. {jwt: MY_JWT} */
  const session = { jwt: token };
  /* Turn session into JSON */
  const sessionJSON = JSON.stringify(session);

  /* Take JSON and encode it as base64 */
  const base64 = Buffer.from(sessionJSON).toString('base64');

  /* Return a string thats the cookie with the encoded data */
  return ['express:sess=' + base64];
};

global.createProducts = async (
  prodAttrs: IProduct,
  total: number,
  cookie: string[]
) => {
  let products: ProductDoc[] = [];

  for (let i = 0; i < total; i++) {
    const { body }: { body: ProductDoc } = await request(app)
      .post('/api/v1/products/create')
      .set('Cookie', cookie)
      .send({ ...prodAttrs });

    products.push(body);
  }
  return products;
};

global.createReviews = async (
  reviewAttrs: ReviewAttrs,
  total: number,
  cookie: string[]
) => {
  let reviews: ReviewDoc[] = [];

  for (let i = 0; i < total; i++) {
    const { body }: { body: ReviewDoc } = await request(app)
      .post('/api/v1/products/reviews/create')
      .set('Cookie', cookie)
      .send({ ...reviewAttrs });

    reviews.push(body);
  }

  return reviews;
};
