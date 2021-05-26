import request from 'supertest';
import app from '../../app';

beforeEach(async () => {
  await global.signup();
});

it('clears the cookie on successful signout', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signout')
    .send({})
    .expect(204);

  expect(response.get('Set-Cookie')[0]).toEqual(
    'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});
