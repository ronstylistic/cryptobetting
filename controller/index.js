exports.load = (req, res, next) => {
	res.render('index', { title: 'Crypto Bet' });
}
