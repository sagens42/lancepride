var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TaskSchema = new Schema({
	name: { type: String, default: '' },
	customer: ObjectId,
	date: { type: Date, default: Date.now },
	duration: { type: Number, default: 0 },
	description: { type: String, default: '' },
	user: ObjectId
});

TaskSchema.path('name').validate(function (name) {
	return name.length;
}, 'Name cannot be blank');

TaskSchema.path('date').validate(function (date) {
	return date;
}, 'Date cannot be blank');

TaskSchema.path('duration').validate(function (duration) {
	return duration !== null && duration !== undefined;
}, 'Duration cannot be blank');

mongoose.model('Task', TaskSchema);