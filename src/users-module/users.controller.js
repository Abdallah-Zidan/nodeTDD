const bcrypt = require('bcrypt');
const User = require('./models/user');

module.exports.storeUser = async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  const user = {
    ...req.body,
    password,
  };
  await User.create(user);
  res.send({ message: 'user created successfully' });
};
