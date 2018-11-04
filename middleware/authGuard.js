module.exports.isPlayerLoggedIn = (req, res, next) => {
    if (!req.session.user || !req.cookies.user_sid) {
        res.redirect('/auth/login');
    } else {
        next();
    }
}
