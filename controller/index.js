const data = {
	title: 'Crypto Bet',
	layout: 'home_layout.hbs',
}

exports.load = (req, res, next) => {
	res.render('index', data);
}
