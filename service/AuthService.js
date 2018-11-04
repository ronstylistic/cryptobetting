const User = require('../models/User');

class AuthService {

    static register(user) {

        return User.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        })
    }

    static login(email){
        return User.findOne({
            email: email
        })
    }


}

module.exports = AuthService;