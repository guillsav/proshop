import request from 'supertest';
import app from '../../../app';

it('can fetch a list of products', async () => {
  await global.createProducts(
    {
      name: 'Sample name',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 1,
      description: 'Sample description',
      image: 'Sample image',
      price: 1
    },
    3,
    global.signin(true)
  );

  const response = await request(app)
    .get('/api/v1/products/all')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
