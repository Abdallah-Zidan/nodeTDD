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

function postValidUser() {
  return request(app).post('/api/1.0/users').send({
    username: 'user',
    email: 'user@email.com',
    password: 'password',
  });
}

describe('User registration functionality', () => {
  it('return 200 when signup request is valid', function (done) {
    postValidUser().expect(200, done);
  });

  it('return success message when signup request is valid', async function () {
    const response = await postValidUser();
    expect(response.body.message).toBe('user created successfully');
  });

  it('saves user to database', async function () {
    await postValidUser();
    const users = await User.findAll();
    expect(users.length).toEqual(1);
  });

  it('saves username and email to database', async function () {
    await postValidUser();
    const users = await User.findAll();
    const first = users[0];
    expect(first.username).toBe('user');
    expect(first.email).toBe('user@email.com');
  });

  it('hashes password in database', async function () {
    await postValidUser();
    const users = await User.findAll();
    const first = users[0];
    expect(first.password).not.toBe('password');
  });
});
