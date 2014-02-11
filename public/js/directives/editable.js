'use strict';
prideapp.directive('editable', function($compile) {
	var linker = function(scope, element, attrs, ngModel) {
		ngModel.$render = function() {
			element.text(ngModel.$viewValue);
			switch (attrs.datatype.toLowerCase()) {
				case 'text':
					element.dblclick(function (event) {
						var $form = angular.element(document.createElement('form'));
						var $elem = angular.element(document.createElement('input'));
						$elem.blur(function () {
							$form.replaceWith(element);
						});
						$form.submit(function () {
							$form.replaceWith(element);
						});
						$elem.attr('ng-model', attrs.ngModel);
						$elem.attr('ng-change', 'editTasks(tasks)');
						$elem.attr('type', 'text');
						$form.append($compile($elem)(scope));
						element.replaceWith($form);
					});
					break;
				case 'number':
					element.dblclick(function (event) {
						var $form = angular.element(document.createElement('form'));
						var $elem = angular.element(document.createElement('input'));
						$elem.blur(function () {
							$form.replaceWith(element);
						});
						$elem.keydown(function (event) {
							if (isNaN(String.fromCharCode(event.which))){ 
								return false; 
							}
						});
						$form.submit(function () {
							$form.replaceWith(element);
						});
						$elem.attr('ng-model', attrs.ngModel);
						$elem.attr('ng-change', 'editTasks(tasks)');
						$elem.attr('type', 'number');
						$form.append($compile($elem)(scope));
						element.replaceWith($form);
					});
					break;
				case 'date':
					var $div = angular.element(document.createElement('div'));
					$div.toggleClass('input-append');
					$div.toggleClass('date');
					$div.attr('ng-model', attrs.ngModel);
					$div.attr('data-date-format', 'dd/mm/yyyy');
					$div.attr('datadate', ngModel.$viewValue);
					$div.attr('datepicker', '');
					var $input = angular.element(document.createElement('input'));
					$input.attr('type', 'text');
					$input.attr('size', '16');
					$input.attr('disabled', '');
					var $span = angular.element(document.createElement('span'));
					$span.toggleClass('add-on');
					$span.html('<i class="icon-calendar"></i>');
					$div.append($input);
					$div.append($span);
					element.replaceWith($compile($div)(scope));
					break;
				default:
					var data = scope[attrs.datatype];
					if (data) {
						var $div = angular.element(document.createElement('div'));
						if (data.constructor === Array) {
							$div.toggleClass('input-append');
							$div.toggleClass('btn-group');
							$div.attr('id', 'dropdown');
							var $input = angular.element(document.createElement('input'));
							$input.attr('type', 'text');
							$input.attr('size', '16');
							$input.attr('disabled', '');
							$input.attr('ng-model', attrs.ngModel);
							$div.append($compile($input)(scope));
							var $aDropdown = angular.element(document.createElement('a'));
							$aDropdown.toggleClass('btn');
							$aDropdown.toggleClass('btn-primary');
							$aDropdown.toggleClass('dropdown-toggle');
							$aDropdown.attr('data-toggle', 'dropdown');
							$aDropdown.attr('href', '#');
							$aDropdown.html('<span class="caret"></span>');
							$div.append($aDropdown);
							var $ul = angular.element(document.createElement('ul'));
							$ul.toggleClass('dropdown-menu');
							for (var i=0; i < data.length;i++) {
								var $li = angular.element(document.createElement('li'));
								var $a = angular.element(document.createElement('a'));
								$a.attr('href', '#');
								$a.text(data[i]);
								$a.click(function () {
									var $self = angular.element(this);
									scope.$apply(function () {
										ngModel.$setViewValue($self.text());
									});
								});
								$li.append($a);
								$ul.append($li);
							}
							var $liDivider = angular.element(document.createElement('li'));
							$liDivider.toggleClass('divider');
							$ul.append($liDivider);
							var $newli = angular.element(document.createElement('li'));
							var $newform = angular.element(document.createElement('form'));
							$newform.bind('click', function (event) {
								event.stopPropagation();
							});
							$newform.attr('id', 'newCustomer');
							$newform.attr('ng-submit', 'addCustomer(newCustomerName)');
							$newform.submit(function () {
								var value = $newinput.val();
								ngModel.$setViewValue(value);
								$newinput.val('');
							});
							var $newinput = angular.element(document.createElement('input'));
							$newinput.attr('placeholder', 'New customer');
							$newinput.attr('type', 'text');
							$newinput.attr('ng-model', 'newCustomerName');
							$newform.append($newinput);
							var $newButton = angular.element(document.createElement('button'));
							$newButton.text('OK');
							$newButton.addClass('btn');
							$newButton.attr('ng-click', 'addCustomer(newCustomerName)');
							$newform.append($newButton);
							$newli.append($compile($newform)(scope));
							$ul.append($newli);
							$div.append($ul);
						}
						element.replaceWith($div);
					}
			}			

		};
		
	}

	return {
		restrict: 'A',
		link: linker,
		require: '?ngModel'
	}
});