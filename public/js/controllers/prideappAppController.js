'use strict';
prideapp.controller('prideappAppController', function prideappController($scope, modelContext) {
	$scope.tasks = [];
	$scope.customers = [];
	modelContext.getTasks().then(function(tasks) {
		$scope.tasks = tasks;
	});
	modelContext.getCustomers().then(function(customers) {
		$scope.customers = customers;
	});

	$scope.date = new Date();

	$scope.$watch('tasks', function(newVal, oldVal) {
		if (newVal && oldVal) {
			newVal.forEach(function(task, index) {
				if (!angular.equals(task, oldVal[index])) {
					modelContext.updateTask(task);
				}
			});
		}
	}, true);
	
	$scope.dateFilter = function(value) {
		var dateOfTask = new Date(value.date);
		var firstDate = new Date(dateOfTask.getFullYear(), 
			dateOfTask.getMonth(), dateOfTask.getDate(), 0, 0, 0);
		var secondDate = new Date($scope.date.getFullYear(), 
			$scope.date.getMonth(), $scope.date.getDate(), 0, 0, 0);
		if (firstDate.getTime() === secondDate.getTime()) {
			return true;
		}
		return false;
	};

	$scope.addTask = function(newTaskName) {
		if (newTaskName === '')
			return;

		modelContext.addTask(newTaskName);
		
		modelContext.getTasks().then(function(tasks) {
			$scope.tasks = tasks;
		});

		$scope.newTaskName = '';
	};

	$scope.addCustomer = function(newCustomerName) {
		if (newCustomerName === '')
			return;
		
		modelContext.addCustomer(newCustomerName);

		modelContext.getCustomers().then(function(customers) {
			$scope.customers = customers;
		});
	};

	$scope.editTask = function(tasks) {
		modelContext.updateTask(newCustomerName);
	};

	$scope.deleteTask = function(task) {
		var index = $scope.tasks.indexOf(task);
		modelContext.deleteTask($scope.tasks[index], function() {
			$scope.tasks.splice(index, 1);
		});
	};
});