// controller/api/auth.js

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const AuthService = require('../../service/AuthService');
const validator = require('../../middleware/validator');

router.post('/register', validator.validateNewPlayer, (req, res) => {

    let errors = req.validationErrors(true);

    if( errors){
        res.status(422).send({error: errors});
    }

    const { firstname, lastname, email, password } = req.body;

    AuthService
        .register(firstname, lastname, email, password)
        .then(() => res.status(200).send({success: true}))
        .catch(error => res.status(500).send({error: error}));

});

router.post('/login', validator.validateCredentials, (req, res) => {

    let errors = req.validationErrors(true);

    if( errors){
        res.status(422).send({error: errors});
    }
    
    const { email, password } = req.body;

    AuthService
        .login(email, password)
        .then(() => res.status(200).send({success: true}))
        .catch(error => res.status(500).send({error: error}));

});

module.exports = router;