import request from 'supertest';
import app from '../../app';

interface IProduct {
  name: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
  image: string;
  price: number;
}

const createProducts = async (attrs: IProduct, total: number) => {
  const { name, brand, category, countInStock, description, image, price } =
    attrs;

  for (let i = 0; i < total; i++) {
    await request(app)
      .post('/api/v1/products/create')
      .set('Cookie', global.signin(true))
      .send({
        name,
        brand,
        category,
        countInStock,
        description,
        image,
        price
      });
  }
};

it('can fetch a list of products', async () => {
  await createProducts(
    {
      name: 'Sample name',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      description: 'Sample description',
      image: 'Sample image',
      price: 0
    },
    3
  );

  const response = await request(app)
    .get('/api/v1/products/all')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
