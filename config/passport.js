var mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = mongoose.model('User');


module.exports = function (passport, config) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	})

	passport.deserializeUser(function(id, done) {
		User.findOne({ _id: id }, function (err, user) {
			done(err, user);
		});
	});

	// use google strategy
	passport.use(new GoogleStrategy({
			clientID: config.google.clientID,
			clientSecret: config.google.clientSecret,
			callbackURL: config.google.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ 'google.id': profile.id }, function (err, user) {
				if (!user) {
	  				user = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						username: profile.username,
						provider: 'google',
						google: profile._json
					});
					user.save(function (err) {
						if (err) console.log(err)
						return done(err, user)
					});
				} else {
					return done(err, user)
				}
			});
		}
	));
};