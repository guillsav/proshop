import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import { ProductDoc } from '../../../model';

let cookie: string[];
let id: string;
let product: ProductDoc[];

beforeEach(async () => {
  cookie = global.signin(true);
  product = await global.createProducts(
    {
      name: 'Sample name',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      description: 'Sample description',
      image: 'Sample image',
      price: 0
    },
    1,
    cookie
  );

  id = product[0].id;
});

it("returns a 404 if the provided product id doesn't exit", async () => {
  const wrongId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/v1/products/delete/${wrongId}`)
    .set('Cookie', cookie)
    .expect(404);
});

it('returns a 403 forbidden access error if the current user is not admin', async () => {
  await request(app)
    .delete(`/api/v1/products/delete/${id}`)
    .set('Cookie', global.signin())
    .expect(403);
});

it('returns a 401 not authorized error if the user is not the one that created the product', async () => {
  await request(app)
    .delete(`/api/v1/products/delete/${id}`)
    .set('Cookie', global.signin(true))
    .expect(401);
});

it('returns a 204 no content on successful delete', async () => {
  await request(app)
    .delete(`/api/v1/products/delete/${id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);
});
