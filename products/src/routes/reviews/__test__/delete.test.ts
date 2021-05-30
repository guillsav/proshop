import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../../app';
import { ReviewDoc } from '../../../model';

let cookie: string[];
let id: string;
let review: ReviewDoc[] = [];

beforeEach(async () => {
  cookie = global.signin();
  review = await global.createReviews(
    {
      name: 'Sample name',
      rating: 4,
      product: new mongoose.Types.ObjectId().toHexString(),
      comment: 'Sample comment',
      user: ''
    },
    1,
    cookie
  );

  id = review[0].id;
});

it("returns a 404 if the review product id doesn't exit", async () => {
  const wrongId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/v1/reviews/delete/${wrongId}`)
    .set('Cookie', cookie)
    .expect(404);
});

it('returns a 400 not authorized error if the user is not the one that created the product', async () => {
  await request(app)
    .delete(`/api/v1/reviews/delete/${id}`)
    .set('Cookie', global.signin())
    .expect(400);
});
