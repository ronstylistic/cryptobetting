var express = require('express');
var router = express.Router();
const userController = require('../controller/users');

/* GET users listing. */
router.get('/', userController.userList);

module.exports = router;
