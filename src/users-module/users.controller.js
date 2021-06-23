const bcrypt = require('bcrypt');
const User = require('./user.model');
const { registrationErrors } = require('./validations');
module.exports.storeUser = async (req, res) => {
  const validationErrors = registrationErrors(req);
  if (validationErrors) {
    return res.status(400).send({ validationErrors });
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const user = {
    ...req.body,
    password,
  };
  await User.create(user);
  res.send({ message: 'user created successfully' });
};
