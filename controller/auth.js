// controller/auth.js
const AuthService = require('../service/AuthService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

const layout = 'login_layout.hbs';

exports.register = (req, res, next) => {
   res.render('register', { title: 'Register', layout: layout });
}

exports.postRegister = (req, res, next) => {

    let data = { title: 'Register', layout: layout };
    let errors = req.validationErrors();

    if (errors) {
        data.validation_error = errors;
        data.form = req.body;
        res.render('register', data);
    }
    else{
        let hashedPassword = bcrypt.hashSync(req.body.password, 10);

        let user = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
        }

        AuthService
            .register(user)
            .then(() => {
                req.flash('success', 'Your account successfully created.');
                res.redirect('/auth/register');
            })
            .catch(() => {
                data.error = "Sorry, Email address already in use.";
                data.form = req.body;
                res.render('register', data);
            });
    }
}


exports.login = (req, res, next) => {
   res.render('login', { title: 'Login', layout: layout });
}

//Submit Login
exports.postLogin = (req, res, next) => {
    let data = { title: 'Login', layout: layout };
    let errors = req.validationErrors();

    if(errors){
        data.validation_error = errors;
        data.form = req.body;
        res.render('login', data);
    }
    else{

        const { email, password } = req.body;
        AuthService.login(email).then((user) => {

            if (user) {

                const passwordIsValid = bcrypt.compareSync(password, user.password);

                if (!passwordIsValid) {
                    data.error = "Login Failed! Email or Password is incorrect.";
                    data.form = req.body;
                    res.render('login', data);
                }
                else{
                    const token = jwt.sign({
                        id: user._id,
                        iss: config.issuer,
                        scope: ['READ', 'WRITE']
                    }, config.secret, {
                        expiresIn: config.token_expiration
                    });
                    
                    let session = {
                        token: token,
                        user: {
                            id: user._id,
                            email: user.email,
                            firstname: user.firstname,
                            lastname: user.lastname
                        }
                    }

                    req.session.user = session;
                    res.redirect('/player/dashboard');
                }
            } else {
                data.error = "Sorry, email address was not found.";
                data.form = req.body;
                res.render('login', data);
            }

        })
        .catch(() => {
            data.error = "Network Error, please try again!";
            res.render('login', data);
        });
    }
   
}

exports.forgotPassword = (req, res, next) => {
    res.render('forgot', { title: 'Forgot Password', layout: layout });
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

/* app.get('/', function (req, res) {
    http.request('http://jsonplaceholder.typicode.com/posts/1', function (response) {
        response.pipe(res);
    }).on('error', function (e) {
        res.sendStatus(500);
    }).end();
}); */