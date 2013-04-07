'use strict';
prideapp.controller('prideappAppController', function prideappController($scope, modelContext) {
	var tasks = modelContext.getTasks();
	var customers = modelContext.getCustomers();

	$scope.tasks = tasks;
	$scope.date = new Date();
	$scope.customers = customers;

	$scope.$watch('tasks', function() {
		modelContext.saveTasks(tasks);
	}, true);

	$scope.$watch('customers', function() {
		modelContext.saveCustomers(customers);
	}, true);
	
	$scope.dateFilter = function(value) {
		var dateOfTask = new Date(value.Date);
		var firstDate = new Date(dateOfTask.getFullYear(), 
			dateOfTask.getMonth(), dateOfTask.getDate(), 0, 0, 0);
		var secondDate = new Date($scope.date.getFullYear(), 
			$scope.date.getMonth(), $scope.date.getDate(), 0, 0, 0);
		if (firstDate.getTime() === secondDate.getTime()) {
			return true;
		}
		return false;
	}

	$scope.addTask = function(newTaskName) {
		if (newTaskName === '')
			return;

		tasks.push({
			'Name' : newTaskName,
			'Customer' : '',
			'Date' : $scope.date,
			'Duration' : 0,
			'Description' : ''
		});

		$scope.newTaskName = ''; // empty var in global scope
	}

	$scope.addCustomer = function(newCustomerName) {
		if (newCustomerName === '')
			return;
		
		customers.push(newCustomerName);
	}

	$scope.editTasks = function(tasks) {
		
	}

	$scope.deleteTask = function(task) {
		tasks.splice(tasks.indexOf(task), 1);
	}
});