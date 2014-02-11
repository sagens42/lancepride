var mongoose = require('mongoose');
var Task = mongoose.model('Task');
var Customer = mongoose.model('Customer');
var extend = require('util')._extend;


exports.getTasks = function(req, res) {
	Task.find({ user: req.user }, function(err, tasks) {
		if (err) { 
			res.send(err);
		}
		res.send(tasks);
	});
};

exports.getCustomers = function(req, res) {
	Customer.find({}, function(err, customers) {
		customers = customers || [];
		if (err) { 
			res.send(err); 
		}
		res.send(customers);
	});
};

exports.addTask = function(req, res) {
	var task = new Task(req.body);
	task.user = req.user;
	task.save(function(err) {
		res.send(200, 'OK');
	});
};

exports.addCustomer = function(req, res) {
	var customer = new Customer(req.body);
	customer.user = req.user;
	customer.save(function(err) {
		res.send(200, 'OK');
	});
};

exports.deleteTask = function(req, res) {
	Task.findOne({ _id: req.params.id }, function(err, task) {
		if (!task) res.send(404, 'Task not found');
		task.remove(function(err) {
			res.send(200, 'OK');
		});
	});
};

exports.deleteCustomer = function(req, res) {
	throw 'Not implemented';
};

exports.updateTask = function(req, res) {
	Task.findOne({ _id: req.params.id }, function(err, task) {
		if (!task) res.send(404, 'Task not found');
		task = extend(task, req.body);
		task.save(function(err) {
			res.send(200, 'OK');
		});
	});
};

exports.updateCustomer = function(req, res) {
	throw 'Not implemented';
};