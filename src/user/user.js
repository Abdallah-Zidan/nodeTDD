const { Model, STRING } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}
User.init(
  {
    username: {
      type: STRING,
    },
    email: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
  },
  {
    sequelize,
    modelName: 'user',
  }
);

module.exports = User;
