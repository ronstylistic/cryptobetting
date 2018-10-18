var express = require('express');
var router = express.Router();
const indexController = require('../controller/index');
const middleware = require('../middleware');

const authRouter = require('./auth');
const playerRouter = require('./player');
const sportsRouter = require('./sports');
const casinoRouter = require('./casino');

/* GET home page. */
router.get('/', indexController.load);

router.use('/auth', authRouter);
//router.use('/player', middleware.isValid, playerRouter);
router.use('/player', playerRouter);
router.use('/sports', sportsRouter);
router.use('/casino', casinoRouter);

module.exports = router;
