var mongoose = require('mongoose');
var User = mongoose.model('User');

var login = function (req, res) {
	var redirectTo = req.session.returnTo || '/';
	delete req.session.returnTo;
	res.redirect(redirectTo);
};

exports.signin = function (req, res) {};

exports.authCallback = login;

exports.login = function (req, res) {
	res.render('users/login', {
		title: 'Login',
		message: req.flash('error')
	});
};

exports.logout = function (req, res) {
	req.logout();
	res.redirect('/login');
};

exports.session = login;

exports.user = function (req, res, next, id) {
	User.findOne({ _id : id }).exec(function (err, user) {
		if (err) return next(err);
		if (!user) return next(new Error('Failed to load User ' + id));
		req.profile = user;
		next();
	});
};