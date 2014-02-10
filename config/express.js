var express = require('express');
var mongoStore = require('connect-mongo')(express);
var flash = require('connect-flash');
var pkg = require('../package.json')

var env = process.env.NODE_ENV || 'development'

module.exports = function (app, config, passport) {
	app.set('showStackError', true)

	app.use(express.compress({
		filter: function (req, res) {
			return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
		},
		level: 9
	}));

	app.use(express.favicon());
	app.use(express.static(config.root + '/public'));

	// set views path, template engine and default layout
	app.set('views', config.root + '/app/views');
	app.set('view engine', 'ejs');

	app.configure(function () {
    	app.use(function (req, res, next) {
      		res.locals.pkg = pkg;
      		next();
    	});
    });

	app.use(express.cookieParser());

	app.use(express.bodyParser());
	app.use(express.methodOverride());

	app.use(express.session({
		secret: 'pkg.name',
		store: new mongoStore({
			url: config.db,
			collection : 'sessions'
		})
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());

	//app.use(express.csrf());

	// app.use(function(req, res, next) {
	// 	res.locals.csrf_token = req.csrfToken();
	// 	next();
	// });

    app.use(app.router);

	app.configure('development', function () {
		app.locals.pretty = true;
	});
};