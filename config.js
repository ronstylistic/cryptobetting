require('dotenv').config();

module.exports = {
    'secret': process.env.SECRECT_KEY,
    'token_expiration': process.env.TOKEN_EXPIRATION,
    'issuer': process.env.TOKEN_ISSUER,
    'database': {
        'host': process.env.DB_HOST,
        'name': process.env.DB_NAME,
        'user': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'port': process.env.DB_PORT
    },
    'url': process.env.API_URL
}