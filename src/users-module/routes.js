const Router = require('express').Router;
const userController = require('./users.controller');
const { registration } = require('./validations');
const router = Router();
router.post('/api/1.0/users', ...registration, userController.storeUser);
module.exports = router;
