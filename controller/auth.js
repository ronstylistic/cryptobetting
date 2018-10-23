// controller/auth.js
const AuthService = require('../service/AuthService');

const data = {
	title: 'Crypto Bet',
	layout: 'login_layout.hbs',
}

exports.register = (req, res, next) => {
    data.title = 'Register';
    data.errors = req.session.errors;
    data.error_message = req.session.error_message;
    //data.success_message = req.session.success_message;
    data.form = data.errors || data.error_message ? req.session.form : null;
    res.render('register', data);

    req.session.error_message = null;
    //req.session.success_message = null;
    req.session.errors = null;
}

exports.postRegister = (req, res, next) => {

    let errors = req.validationErrors(true);
    req.session.form = req.body;

    if (errors) {
        req.session.errors = errors;
        res.redirect('/auth/register');
    } else {

        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
        }

        AuthService.register(user)
            .then((result) => {
                if (result.auth) {
                    req.session.user = result;
                    res.redirect('/player/dashboard');
                }
            })
            .catch((error) => {
                req.session.error_message = "Sorry, Email address already in use.";
                res.redirect('/auth/register');
            });
    }
}


exports.login = (req, res, next) => {

    data.title = 'Login';
    data.errors = req.session.errors;
    data.error_message = req.session.error_message;
    data.success_message = req.session.success_message;
    data.form = req.session.errors || req.session.error_message ? req.session.form : null;

    res.render('login', data);

    req.session.error_message = null;
    req.session.success_message = null;
    req.session.errors = null;
}

//Submit Login
exports.postLogin = (req, res, next) => {
    let errors = req.validationErrors(true);
    req.session.form = req.body;

    if (errors) {
        req.session.errors = errors;
        res.redirect('/auth/login');
    } else {
        const { email, password } = req.body;

        AuthService.login(email, password)
            .then((result) => {

                if (result.auth) {
                    req.session.user = result;
                    res.redirect('/player/dashboard');
                } else {
                    req.session.error_message = "Login Failed! Email or Password as incorrect.";
                    res.redirect('/auth/login');
                }

            })
            .catch(() => {
                req.session.error_message = "Sorry, Email address already in use.";
                res.redirect('/auth/login');
            });
    }
}

exports.forgotPassword = (req, res, next) => {
    data.title = 'Forgot Password';
    res.render('forgot', data);
}

exports.postForgotPassword = (req, res) => {

}

exports.confirmation = (req, res) => {

    const { email } = req.params;

    /* AuthService.verifyEmail(email)
        .then(() => {
            req.session.success_message = "Congratulations. Your account was activated.";
            res.redirect('/auth/login');
        })
        .catch((error) => {
            req.session.error_message = error;
            res.redirect('/auth/login');
        }); */
}