import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';
import { ProductDoc } from '../../model';

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

it("returns a 404 if the provided product id doesn't exist", async () => {
  const wrongId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/v1/products/update/${wrongId}`)
    .set('Cookie', global.signin(true))
    .expect(404);
});

it('returns a 403 forbidden access error if the current user is not admin', async () => {
  await request(app)
    .put(`/api/v1/products/update/${id}`)
    .set('Cookie', global.signin())
    .expect(403);
});

it('returns a 401 not authorized error if the user is not the one that created the product', async () => {
  await request(app)
    .put(`/api/v1/products/update/${id}`)
    .set('Cookie', global.signin(true))
    .expect(401);
});

it('returns a 422 validation error if one of the provided input is invalid', async () => {
  await request(app)
    .put(`/api/v1/products/update/${id}`)
    .set('Cookie', cookie)
    .send({
      name: 1
    })
    .expect(422);
});

it('returns a 200 OK on successful update', async () => {
  await request(app)
    .put(`/api/v1/products/update/${id}`)
    .set('Cookie', cookie)
    .send({ name: 'Sample name 2' })
    .expect(200);
});
