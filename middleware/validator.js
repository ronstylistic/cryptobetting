module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/auth/login');
    }
    else {
        next();
    }
}

module.exports.isValid = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}
module.exports.isLoggedIn = (req, res, next) => {
    if( req.session.user && req.cookies.user_sid ){
        res.redirect('/player/dashboard');
    }
    else{
        next();
    }
} 

module.exports.validateNewPlayer = (req, res, next) => {
    req.checkBody('firstname', 'Firstname is required').not().isEmpty();
    req.checkBody('lastname', 'Lastname is required').not().isEmpty();
    req.checkBody('email', 'Email address is invalid').isEmail();
    req.checkBody('password', 'Password is must be minimum of 8 characters.').isLength({ min: 8});

    next();
}

module.exports.validateCredentials = (req, res, next) => {
    req.checkBody('email', 'Email address is invalid').isEmail();
    req.checkBody('password', 'Password is must be minimum of 8 characters.').isLength({ min: 8});
    next();
}

