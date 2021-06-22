const express = require('express');
const app = express();
const UsersModule = require('./users-module');
app.use(express.static(require.main.path + '/client'));
app.use(express.json());
app.use(UsersModule.routes);

module.exports = app;
