var express = require('express');
var router = express.Router();
const indexController = require('../controller/index');
const middleware = require('../middleware');

const authRouter = require('./auth');
const playerRouter = require('./player');

/* GET home page. */
router.get('/', indexController.load);

router.use('/auth', authRouter);
router.use('/player', middleware.isValid, playerRouter);

module.exports = router;
