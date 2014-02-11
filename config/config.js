var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	development: {
		db: 'CONNECTIONSTRING',
		root: rootPath,
		app: {
			name: 'lancepride'
		},
		google: {
			clientID: "clientID",
			clientSecret: "clientSecret",
			callbackURL: "callbackURL"
		}
	},
	test: {
		db: 'CONNECTIONSTRING',
		root: rootPath,
		app: {
			name: 'lancepride'
		},
		google: {
			clientID: "clientID",
			clientSecret: "clientSecret",
			callbackURL: "callbackURL"
		}
	},
	production: {}
};