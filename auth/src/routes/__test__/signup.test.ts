import request from 'supertest';
import app from '../../app';

it('returns a 201 ok on successful signup', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 'test', email: 'test@test.com', password: 'password' })
    .expect(201);
});

it('returns a 422 validation error with an invalid name', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 1, email: 'test@test.com', password: 'password' })
    .expect(422);
});

it('returns a 422 validation error with an invalid email', async () => {
  return request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 'test', email: 'sdgdsa', password: 'password' })
    .expect(422);
});

it('returns a 422 validation error with missing name, email or password', async () => {
  return request(app).post('/api/v1/auth/signup').send({}).expect(422);
});

it('returns a 400 bad request error if the email is already in use', async () => {
  await request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 'test', email: 'test@test.com', password: 'password' });

  return request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 'test', email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('sets a cookie on successful signup', async () => {
  const response = await request(app)
    .post('/api/v1/auth/signup')
    .send({ name: 'test', email: 'test@test.com', password: 'password' });

  expect(response.get('Set-Cookie')).toBeDefined();
});
