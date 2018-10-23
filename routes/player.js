/* routes/player.js */

const express = require('express');
const router = express.Router();
const playerController = require('../controller/player');

/* GET home page. */
router.get('/', (req, res) => {
	res.redirect('/player/dashboard');
});

router.get('/dashboard', playerController.dashboard);
router.get('/deposit', playerController.deposit);
router.get('/withdraw', playerController.withdrawal);
router.get('/wallet_transactions', playerController.walletTransactions);
router.get('/bet_history', playerController.betHistory);
router.get('/settings', playerController.settings);

router.get('/logout', (req, res) => {
	if( req.session.user && req.cookies.user_sid ){
		res.clearCookie('user_sid');
	}

	res.redirect('/auth/login');

});

module.exports = router;
