const User = require('../models/User');

class AuthService {

    static register(firstname, lastname, email, password) {

        return User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        })
    }

    static login(email, password){
        return User.findOne({
            email: email,
            password: password
        })
    }


}

module.exports = AuthService;