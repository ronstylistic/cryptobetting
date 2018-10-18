// controller/auth.js

const User = require('../models/User');
const AuthService = require('../service/AuthService');
const axios = require('axios');
const url = "http://localhost:3000";

const data = {
	title: 'Crypto Bet',
	layout: 'login_layout.hbs',
}

module.exports.login = (req, res) => {
    res.render('login', data);
}

module.exports.postLogin = (req, res) => {
    let errors = req.validationErrors(true);

    if (errors) {
        data.errors = errors;
        res.redirect('/auth/login');
    }
    else{
        const { email, password } = req.body;
        AuthService
            .login(email, password)
            .then((user) => {
                if( user){
                    req.session.user = user;
                    res.redirect('/player/dashboard');

                }else{
                    res.status(500).send({ auth: false })
                }
                
            })
            .catch(error => res.status(500).send(error));
    }
}

module.exports.register = (req, res) => {

    res.render('register', data);
}

module.exports.postRegister = (req, res ) => {
    
    let errors = req.validationErrors(true);

    if (errors) {
        data.errors = errors;
        res.redirect('/auth/register');
    }
    else{
        const { firstname, lastname, email, password } = req.body;
        AuthService
            .register(firstname, lastname, email, password)
            .then(() => res.status(200).send({success: true}))
            .catch(error => res.status(500).send(error));
    }
   /* axios.post( url + '/api/v1/auth/register', req.body)
   .then((response) => res.status(200).send( response.data ) )
   .catch((error) => res.status(500).send({error: error.message})) */

}