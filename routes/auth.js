// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const validator = require('../middleware/validator');

//auth login routes
router.get('/login',  validator.isLoggedIn, authController.login);
router.post('/login', validator.validateCredentials, authController.postLogin);

//auth register routes
router.get('/register', authController.register);
router.post('/register', validator.validateNewPlayer, authController.postRegister);


module.exports = router;
