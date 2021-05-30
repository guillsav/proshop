import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';

it('can fetch a list of reviews', async () => {
  await global.createReviews(
    {
      name: 'Sample name',
      rating: 4,
      comment: 'Sample comment',
      product: new mongoose.Types.ObjectId().toHexString()
    },
    3,
    global.signin()
  );

  const response = await request(app)
    .get('/api/v1/reviews/all')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
