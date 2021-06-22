const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/user');
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User registration functionality', () => {
  it('return 200 when signup request is valid', function (done) {
    request(app)
      .post('/api/v1.0/users')
      .send({
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      })
      .expect(200, done);
  });

  it('return success message when signup request is valid', function (done) {
    request(app)
      .post('/api/v1.0/users')
      .send({
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      })
      .then((response) => {
        expect(response.body.message).toBe('user created successfully');
        done();
      });
  });

  it('saves user to database', function (done) {
    request(app)
      .post('/api/v1.0/users')
      .send({
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      })
      .then(() => {
        User.findAll().then((users) => {
          expect(users.length).toEqual(1);
          done();
        });
      });
  });
  it('saves username and email to database', function (done) {
    request(app)
      .post('/api/v1.0/users')
      .send({
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      })
      .then(() => {
        User.findAll().then((users) => {
          const first = users[0];
          expect(first.username).toBe('user');
          expect(first.email).toBe('user@email.com');
          done();
        });
      });
  });
});
