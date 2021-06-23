const { check, validationResult } = require('express-validator');
module.exports.registration = [
  check('username').notEmpty().withMessage("username can't be null"),
  check('email').notEmpty().withMessage("email can't be null"),
];

module.exports.registrationErrors = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors = {};
    errors.array().forEach((err) => {
      validationErrors[err.param] = err.msg;
    });
    return validationErrors;
  }
};
