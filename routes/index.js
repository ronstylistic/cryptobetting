var express = require('express');
var router = express.Router();
const indexController = require('../controller/index');
const validator = require('../middleware/validator');

const authRouter = require('./auth');
const playerRouter = require('./player');
const sportsRouter = require('./sports');
const casinoRouter = require('./casino');

/* GET home page. */
router.get('/', indexController.load);

router.use('/auth', authRouter);
router.use('/player', validator.isValid, playerRouter);
router.use('/sports', sportsRouter);
router.use('/casino', casinoRouter);

module.exports = router;
