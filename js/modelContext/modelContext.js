'use strict';
prideapp.factory('modelContext', function modelContext () {
	return {
		getTasks: function () {
			return JSON.parse(localStorage.getItem('tasks') || '[]');
		},

		saveTasks: function (tasks) {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		},

		getCustomers: function() {
			return JSON.parse(localStorage.getItem('customers') || '[]');
		},

		saveCustomers: function(customers) {
			localStorage.setItem('customers', JSON.stringify(customers));
		}
	};
});