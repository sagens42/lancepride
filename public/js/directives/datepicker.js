'use strict';
prideapp.directive('datepicker', function() {
	var linker = function(scope, element, attrs, ngModel) {
		ngModel.$render = function () {
			var date = new Date(ngModel.$viewValue);
			element.datepicker({ autoclose : true });
			var toDMY = function dateToYMD(date) {
				var d = date.getDate();
				var m = date.getMonth() + 1;
				var y = date.getFullYear();
				return '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y;
			}
			element.datepicker('update', toDMY(date));
			element.bind('changeDate', function (event) {
				var newValue = event.date;
				scope.$apply(function () {
					ngModel.$setViewValue(newValue);
				});
			});
		}
	}

	return {
		restrict: 'A',
		link: linker,
		require: '?ngModel'
	}
});