const { check, validationResult } = require('express-validator');
module.exports.registration = [
  check('username')
    .notEmpty()
    .withMessage("username can't be null")
    .bail()
    .isLength({ max: 32, min: 4 })
    .withMessage('username must be between 4 and 32 characters'),
  check('email').notEmpty().withMessage("email can't be null").bail().isEmail().withMessage('email is not valid'),
  check('password')
    .notEmpty()
    .withMessage("password can't be null")
    .bail()
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
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
