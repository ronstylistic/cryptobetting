const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

class AuthService {

    static register(user) {

        let hashedPassword = bcrypt.hashSync(user.password, 8);

        return User.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: hashedPassword
        })
        .then((user) => {
            
            let token = jwt.sign({
                email: user.email
            }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            return {
                auth: true,
                id: user._id,
                token: token
            }
            
        })
    }

    static login(email, password){
        return User.findOne({
            email: email
        })
        .then((user) => {
            if(user){
                const passwordIsValid = bcrypt.compareSync(password, user.password);

                if (!passwordIsValid) {
                    return {
                        auth: false
                    }
                }

                let token = jwt.sign({
                    email: user.email
                }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });

                return {
                    auth: true,
                    id: user._id,
                    token: token
                }
            }
            else{

                return {
                    auth: false
                }
            }
            
        });
    }


}

module.exports = AuthService;