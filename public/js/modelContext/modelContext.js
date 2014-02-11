'use strict';
prideapp.factory('modelContext', function modelContext ($http, $q) {
	return {
		getTasks: function () {
			var deferred = $q.defer();
			$http.get('/api/tasks').success(function(response){
				deferred.resolve(response);
			});
			return deferred.promise;
		},

		addTask: function (task) {
			$http.post('/api/tasks', { name: task }).success(function(response) {

			});
		},

		deleteTask: function (task, callback) {
			$http.delete('/api/task/' + task._id).success(function(response) {
				if (callback) callback.call(this);
			});
		},

		updateTask: function (task, callback) {
			$http.put('/api/task/' + task._id, task).success(function(response) {
				if (callback) callback.call(this);
			});
		},

		getCustomers: function() {
			var deferred = $q.defer();
			$http.get('/api/customers', function(response) {
				deferred.resolve(response);
			}, function(error){
				deferred.reject(error)
			});
			return deferred.promise;
		},

		addCustomer: function(customerName, callback) {
			$http.post('/api/customers', { name: customerName }).success(function(response) {
				if (callback) callback.call(this);
			});
		}
	};
});