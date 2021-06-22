const Router = require('express').Router;
const userController = require('./users.controller');
const { check } = require('express-validator');
const router = Router();
router.post('/api/1.0/users', check('username').notEmpty(), check('email').notEmpty(), userController.storeUser);
module.exports = router;
