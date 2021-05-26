import request from 'supertest';
import app from '../../app';

let cookie: string[];

beforeEach(async () => {
  cookie = await global.signup();
});

it('returns a 200 ok response with details about the currentuser profile', async () => {
  const response = await request(app)
    .get('/api/v1/auth/profile')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.email).toEqual('test@test.com');
});
