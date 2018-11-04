module.exports.validateNewPlayer = (req, res, next) => {
    req.checkBody('firstname', 'Firstname is required').not().isEmpty();
    req.checkBody('lastname', 'Lastname is required').not().isEmpty();
    req.checkBody('email', 'Email address is invalid').isEmail();
    req.checkBody('password', 'Password is must be minimum of 8 characters.').isLength({ min: 8});

    next();
}

module.exports.validateCredentials = (req, res, next) => {
    req.checkBody('email', 'Email address is invalid').isEmail();
    req.checkBody('password', 'Password must not be empty').not().isEmpty();
    
    next();
}

