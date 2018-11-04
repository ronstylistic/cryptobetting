const data = {
	title: 'Crypto Bet',
	layout: 'player_layout.hbs',
	user: 'ronstylistic',
	email: 'ronnelbedana2011@gmail.com'
}

exports.dashboard = (req, res, next) => {
	data.pageTitle = 'My Account';
	res.render('player/dashboard', data);
}

exports.deposit = (req, res, next) => {
	data.pageTitle = 'Deposit';
	res.render('player/deposit', data);
}

exports.withdrawal = (req, res, next) => {
	data.pageTitle = 'Withdrawal';
	res.render('player/withdrawal', data);
}

exports.walletTransactions = (req, res, next) => {
	data.pageTitle = 'Wallet Transactions';
	res.render('player/wallet_transactions', data);
}

exports.betHistory = (req, res, next) => {
	data.pageTitle = 'Bet History';
	res.render('player/bet_history', data);
}

exports.settings = (req, res, next) => {
	data.pageTitle = 'Settings';
	res.render('player/settings', data);
}

exports.logout = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
	}
	req.flash('success', 'Your successfully logged out.');
	res.redirect('/auth/login');
}