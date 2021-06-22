module.exports.registration = (req, res, next) => {
  if (req.body.username === null) {
    return res.status(400).send({ validationErrors: { username: "username can't be null" } });
  }
  next();
};
module.exports.validateUsername = (req, res, next) => {
  if (req.body.username === null) {
    return res.status(400).send({ validationErrors: { username: "username can't be null" } });
  }
  next();
};
module.exports.validateEmail = (req, res, next) => {
  if (req.body.email === null) {
    return res.status(400).send({ validationErrors: { email: "email can't be null" } });
  }
  next();
};
