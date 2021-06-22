const Sequelize = require('sequelize').Sequelize;
const sequelize = new Sequelize('hoxify', 'mydb-user', 'db-pass', {
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

module.exports = sequelize;
