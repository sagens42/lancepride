var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		db: 'mongodb://lancepride:lancepride@ds027799.mongolab.com:27799/lancepride',
		root: rootPath,
		app: {
			name: 'lancepride'
		},
		google: {
			clientID: "750129651926-hle6c37esnchpg8hdb6eeaoup34imvbv.apps.googleusercontent.com",
			clientSecret: "pQGa3eOQGIlugAWrbLsn8iXk",
			callbackURL: "http://localhost:3000/auth/google/callback"
		}
	},
	test: {
		db: 'mongodb://lancepride:lancepride@ds027799.mongolab.com:27799/lancepride',
		root: rootPath,
		app: {
			name: 'Nodejs Express Mongoose Demo'
		},
		google: {
			clientID: "750129651926-hle6c37esnchpg8hdb6eeaoup34imvbv.apps.googleusercontent.com",
			clientSecret: "pQGa3eOQGIlugAWrbLsn8iXk",
			callbackURL: "http://localhost:3000/auth/google/callback"
		}
	},
	production: {}
};