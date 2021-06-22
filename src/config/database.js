const Sequelize = require('sequelize').Sequelize;
const dbconfig = require('config').get('database');

const sequelize = new Sequelize('hoxify', dbconfig.get('user'), dbconfig.get('pass'), {
  dialect: dbconfig.get('dialect'),
  storage: dbconfig.get('storage'),
  logging: dbconfig.get('logging'),
});

module.exports = sequelize;
