const Router = require('express').Router;
const userController = require('../users.controller');
const router = Router();
router.post('/api/1.0/users', userController.storeUser);
module.exports = router;
