var async = require('async');
var users = require('../app/controllers/users');
var actions = require('../app/controllers/index');
var auth = require('./middlewares/authorization');
var api = require('../app/controllers/api');

module.exports = function (app, passport) {
	app.get('/', auth.requiresLogin, actions.index);

	// api stuff
	app.get('/api/tasks', auth.requiresLogin, api.getTasks);
	app.get('/api/customers', auth.requiresLogin, api.getCustomers);
	app.post('/api/tasks', auth.requiresLogin, api.addTask);
	app.post('/api/customer', auth.requiresLogin, api.addCustomer);
	app.del('/api/task/:id', auth.requiresLogin, api.deleteTask);
	app.del('/api/customer/:id', auth.requiresLogin, api.deleteCustomer);
	app.put('/api/task/:id', auth.requiresLogin, api.updateTask);
	app.put('/api/customer/:id', auth.requiresLogin, api.updateTask);

	// login stuff
	app.get('/login', users.login);
	app.get('/logout', users.logout);
	app.get('/auth/google',
		passport.authenticate('google', {
		failureRedirect: '/login',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		]
	}), users.signin);
  	app.get('/auth/google/callback',
    	passport.authenticate('google', {
      		failureRedirect: '/login'
    	}), users.authCallback);
};