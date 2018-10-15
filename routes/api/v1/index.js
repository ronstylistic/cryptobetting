const express = require('express');
const router = express.Router();
const authController = require('../../../controller/api/auth');
const playerController = require('../../../controller/api/player');

router.use('/auth', authController);
router.use('/player', playerController);

module.exports = router;