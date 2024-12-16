import request from 'supertest';
import app from './app';

describe('GET /', () => {
  test('should return a message', async () => {
    await request(app).get('/').expect('Content-Type', /json/).expect(200, {
      message: `The server is up and running in test mode`,
    });
  });
});
