'use strict';
prideapp.controller('prideappReportController', function prideappController($scope, modelContext) {
	var tasks = modelContext.getTasks();
	var customers = modelContext.getCustomers();
	var tempDate = new Date();
	var date = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate());
	var dayMiliSeconds = 60*60*24*1000;
	customers.push(''); // unassigned tasks

	$scope.customers = customers;

	$scope.getStatistics = function (customer) {
		var today = 0;
		var lastWeek = 0;
		var lastMonth = 0;
		var i = tasks.length;
		while (i--) {
			var task = tasks[i];
			if (task.Customer === customer) {
				var tempTaskDate = new Date(task.Date);
				var taskDate = new Date(tempTaskDate.getFullYear(), tempTaskDate.getMonth(), tempTaskDate.getDate());
				var diffTime = date - taskDate;
				if (taskDate.getTime() == date.getTime()) {
					today += task.Duration;
				}
				if ((diffTime > 0) && (diffTime < dayMiliSeconds * 7)) {
					lastWeek += task.Duration;
				}
				if ((diffTime > 0) && (diffTime < dayMiliSeconds * 31)) {
					lastMonth += task.Duration;
				}
			}
		}

		return [today, lastWeek, lastMonth];
	};
})