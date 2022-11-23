const request = require('supertest');
const server = 'http://localhost:8080';

describe('Performs tests on routes.', () => {

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
        .get('/')
        .expect('Content-Type', "text/html; charset=utf-8")
        .expect(200);
      });
    });
  });

  describe('/user/1', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
        .get('/user/1')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(200);
      });
    });
  });
});