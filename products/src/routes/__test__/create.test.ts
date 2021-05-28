import request from 'supertest';
import app from '../../app';
import { Product } from '../../model';

it('has a route handler listening to /api/v1/products for post requests to create or add a new product', async () => {
  const response = await request(app).post('/api/v1/products/create').send({});

  expect(response.status).not.toEqual(404);
});
