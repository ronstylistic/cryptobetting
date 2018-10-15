// controller/api/auth.js

const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const AuthService = require('../../service/AuthService');

router.post('/register', (req, res) => {
    
    req.checkBody('firstname', 'Firstname is required').not().isEmpty();
    req.checkBody('lastname', 'Lastname is required').not().isEmpty();
    req.checkBody('email', 'Email address is invalid').isEmail();
    req.checkBody('password', 'Password is invalid.').isLength({ min: 8});

    let errors = req.validationErrors(true);

    if( errors){
        res.status(422).send({error: errors});
    }

    const { firstname, lastname, email, password } = req.body;

    AuthService
        .register(firstname, lastname, email, password)
        .then(() => res.status(200).send({success: true}))
        .catch(error => res.status(500).send(error));

});

router.post('/login', (req, res) => {
    res.status(200).send({success: true});
});

module.exports = router;