const express = require('express');
const app = express();
const User = require('./user/user');
app.use(express.json());
app.post('/api/v1.0/users', async (req, res) => {
  await User.create(req.body);
  res.send({ message: 'user created successfully' });
});

module.exports = app;
