import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { config } from '../config';
import { Token } from '../helpers';

declare global {
  namespace NodeJS {
    interface Global {
      signin(isAdmin?: boolean): string[];
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
    isAdmin
  };

  /* Build up session object. {jwt: MY_JWT} */
  const token = Token.generateToken(payload.id, payload.email, config.jwtKey);

  /* Build up session object. {jwt: MY_JWT} */
  const session = { jwt: token };
  /* Turn session into JSON */
  const sessionJSON = JSON.stringify(session);

  /* Take JSON and encode it as base64 */
  const base64 = Buffer.from(sessionJSON).toString('base64');

  /* Return a string thats the cookie with the encoded data */
  return ['express:sess=' + base64];
};
