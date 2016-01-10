(function() {
	var app = angular.module('pizzaPlease', []);

	app.controller('SearchCityController', function($scope) {
		$scope.service = cityService;
	});

	app.service('cityService', function($http) {
		var url = "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=USCA&template=<geobytes%20city>,%20<geobytes%20code>&q=";

		
	});

})();
