import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app';

it('returns a 404 not found error if the product is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/v1/products/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});

it('returns a 200 ok if the product is found', async () => {
  const {
    body: { id }
  } = await request(app)
    .post('/api/v1/products/create')
    .set('Cookie', global.signin(true))
    .send({
      name: 'Sample name',
      price: 0,
      image: 'Sample image',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      description: 'Sample description'
    })
    .expect(201);

  await request(app)
    .get(`/api/v1/products/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(200);
});
