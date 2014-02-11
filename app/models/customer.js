var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	name: { type: String, default: '' }
});

CustomerSchema.path('name').validate(function (name) {
	return name.length;
}, 'Name cannot be blank');

mongoose.model('Customer', CustomerSchema);