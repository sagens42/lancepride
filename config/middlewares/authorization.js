exports.requiresLogin = function (req, res, next) {
	if (req.isAuthenticated()) return next();
	if (req.method == 'GET') req.session.returnTo = req.originalUrl;
	res.redirect('/login');
};

exports.user = {
	hasAuthorization: function (req, res, next) {
		if (req.profile.id != req.user.id) {
			req.flash('info', 'You are not authorized');
			return res.redirect('/login');
		}
		next();
	}
};