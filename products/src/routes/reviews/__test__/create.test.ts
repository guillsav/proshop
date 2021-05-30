import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';

it('has a route handler listening to /api/v1/products/reviews/create for post requests to create or add a new product', async () => {
  const { status } = await request(app)
    .post('/api/v1/products/reviews/create')
    .send({});

  expect(status).not.toEqual(404);
});

it('returns a 422 validation error if the request body has an invalid input or missing a field to create a review', async () => {
  return await request(app)
    .post('/api/v1/products/reviews/create')
    .set('Cookie', global.signin())
    .set({
      rating: 4,
      comment: 'Sample comment'
    })
    .expect(422);
});

it('returns a 201 Created and creates a review with valid inputs', async () => {
  return await request(app)
    .post('/api/v1/products/reviews/create')
    .set('Cookie', global.signin())
    .send({
      name: 'Sample name',
      rating: 4,
      comment: 'Sample comment',
      product: new mongoose.Types.ObjectId().toHexString()
    })
    .expect(201);
});
