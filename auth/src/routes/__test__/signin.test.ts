import request from 'supertest';
import app from '../../app';

/* Handles automatic signup before each test */
beforeEach(async () => {
  await global.signup();
});

it('returns a 200 ok on successful signin', async () => {
  return request(app)
    .post('/api/v1/auth/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
});

it('returns a 404 not found error when the user is not found based on a wrong email', async () => {
  return request(app)
    .post('/api/v1/auth/signin')
    .send({ email: 'testing@test.com', password: 'password' })
    .expect(404);
});

it("returns a 400 bad request error when the supplied password doesn't match the password assiociated to the user found in the database", async () => {
  return request(app)
    .post('/api/v1/auth/signin')
    .send({ email: 'test@test.com', password: '(f0(}**a*@xs]gyte' })
    .expect(400);
});

it('sets a cookie on successful signin', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signin')
    .send({ email: 'test@test.com', password: 'password' });

  expect(response.get('Set-Cookie')).toBeDefined();
});
