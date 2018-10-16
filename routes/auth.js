// routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controller/auth');
const middleware = require('../middleware');

//auth login routes
router.get('/login',  middleware.isLoggedIn, authController.login);
router.post('/login', middleware.validateCredentials, authController.postLogin);

//auth register routes
router.get('/register', authController.register);
router.post('/register', authController.postRegister);


module.exports = router;
