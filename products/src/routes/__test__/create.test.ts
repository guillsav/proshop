import request from 'supertest';
import app from '../../app';
import { Product } from '../../model';

it('has a route handler listening to /api/v1/products for post requests to create or add a new product', async () => {
  const response = await request(app).post('/api/v1/products/create').send({});

  expect(response.status).not.toEqual(404);
});

it('returns a 401 unauthorized error if the user is not signed in', async () => {
  const response = await request(app).post('/api/v1/products/create').send({});

  expect(response.status).toEqual(401);
});

it("returns a 403 forbidden access error if the user doesn't have admin role", async () => {
  const response = await request(app)
    .post('/api/v1/products/create')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).toEqual(403);
});

it('returns a 422 validation error if the request body has an invalid input or missing a field to create a product', async () => {
  const response = await request(app)
    .post('/api/v1/products/create')
    .set('Cookie', global.signin(true))
    .send({});

  console.log(response);

  expect(response.status).toEqual(422);
});
