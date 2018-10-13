
const User = require('../models/User');

exports.userList = function(req, res, next){
	res.render('layout', { title: 'User Page' });
}
