var express = require('express');
var router = express.Router();
const indexController = require('../controller/index');
const authGuard = require('../middleware/authGuard');

const authRouter = require('./auth');
const playerRouter = require('./player');
const sportsRouter = require('./sports');
const casinoRouter = require('./casino');

/* GET home page. */
router.get('/', indexController.load);

router.use('/auth', authRouter);
router.use('/player', authGuard.isPlayerLoggedIn, playerRouter);
router.use('/sports', sportsRouter);
router.use('/casino', casinoRouter);

module.exports = router;
