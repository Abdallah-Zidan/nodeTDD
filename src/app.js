const express = require('express');
const app = express();
const User = require('./user/user');

app.use(express.static(require.main.path + '/client'));
app.use(express.json());
app.post('/api/1.0/users', async (req, res) => {
  await User.create(req.body);
  res.send({ message: 'user created successfully' });
});

module.exports = app;
