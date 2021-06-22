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

    it("return username can't be null when username is null", async () => {
      const response = await postUser({
        username: null,
        email: 'user@email.com',
        password: 'password',
      });
      expect(response.body.validationErrors.username).toBe("username can't be null");
    });

    it("return email can't be null when email is null", async () => {
      const response = await postUser({
        username: 'user',
        email: null,
        password: 'password',
      });
      expect(response.body.validationErrors.email).toBe("email can't be null");
    });
  });
});
