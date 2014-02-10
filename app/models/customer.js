var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
	name: { type: String, default: '' }
});

CustomerSchema.path('name').validate(function (name) {
	if (this.doesNotRequireValidation()) return true;
	return name.length;
}, 'Name cannot be blank');

mongoose.model('Customer', CustomerSchema);