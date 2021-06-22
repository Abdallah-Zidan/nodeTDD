const bcrypt = require('bcrypt');
const User = require('./user.model');
const { validationResult } = require('express-validator');
module.exports.storeUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array.forEach(err=>{
      
    })
    return res.status(400).send(errors);
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const user = {
    ...req.body,
    password,
  };
  await User.create(user);
  res.send({ message: 'user created successfully' });
};
