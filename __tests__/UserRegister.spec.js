const request = require('supertest');
const app = require('../src/app');
const User = require('../src/users-module').User;
const sequelize = require('../src/config/database');

beforeAll(() => {
  return sequelize.sync();
});

beforeEach(() => {
  return User.destroy({ truncate: true });
});
const validUser = {
  username: 'user',
  email: 'user@email.com',
  password: 'password',
};

function postUser(user = validUser) {
  return request(app).post('/api/1.0/users').send(user);
}

describe('User registration functionality', () => {
  describe('success cases', () => {
    it('return 200 when signup request is valid', function (done) {
      postUser().expect(200, done);
    });

    it('return success message when signup request is valid', async function () {
      const response = await postUser();
      expect(response.body.message).toBe('user created successfully');
    });

    it('saves user to database', async function () {
      await postUser();
      const users = await User.findAll();
      expect(users.length).toEqual(1);
    });

    it('saves username and email to database', async function () {
      await postUser();
      const users = await User.findAll();
      const first = users[0];
      expect(first.username).toBe('user');
      expect(first.email).toBe('user@email.com');
    });

    it('hashes password in database', async function () {
      await postUser();
      const users = await User.findAll();
      const first = users[0];
      expect(first.password).not.toBe('password');
    });
  });

  describe('rejection cases', () => {
    it.each`
      field         | value             | expectedMessage
      ${'username'} | ${null}           | ${"username can't be null"}
      ${'username'} | ${'abc'}          | ${'username must be between 4 and 32 characters'}
      ${'username'} | ${'a'.repeat(45)} | ${'username must be between 4 and 32 characters'}
      ${'email'}    | ${null}           | ${"email can't be null"}
      ${'email'}    | ${'mail.com'}     | ${'email is not valid'}
      ${'password'} | ${null}           | ${"password can't be null"}
      ${'password'} | ${'abcd4'}        | ${'password must be at least 6 characters'}
    `('return $expectedMessage when $field is $value', async ({ field, value, expectedMessage }) => {
      const user = {
        username: 'user',
        email: 'user@email.com',
        password: 'password',
      };

      user[field] = value;
      const response = await postUser(user);
      expect(response.body.validationErrors[field]).toBe(expectedMessage);
    });

    it('return 400 when usename is null', async () => {
      const response = await postUser({
        username: null,
        email: 'user@email.com',
        password: 'password',
      });
      expect(response.status).toBe(400);
    });

    it('return response as validation errors', async () => {
      const response = await postUser({
        username: null,
        email: 'user@email.com',
        password: 'password',
      });
      expect(response.body.validationErrors).not.toBeUndefined();
    });
  });
});
