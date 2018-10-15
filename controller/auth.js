// controller/auth.js

const User = require('../models/User');
const AuthService = require('../service/AuthService');

const data = {
	title: 'Crypto Bet',
	layout: 'loginLayout.hbs',
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
}