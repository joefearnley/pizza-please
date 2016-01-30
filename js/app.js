

(function() {
	var app = angular.module('pizzaPlease', []);

	app.controller('SearchCityController', function($scope, $http) {

		//$scope.service = cityService;
		$scope.title = 'Find Pizza';

		// $http.get('airplanes.json').success(function(data) {
		// 	$scope.airplanes = data;
		// });

		// $scope.gPlace;

		$scope.findPizza = function() {
			console.log('Finding pizza');

		// 	$http({
		// 		method: 'JSONP',
		// 		url: weatherUrl + $scope.city
		// }).then(function(data) {
		// 	console.log(data);
		// });

		};

	});

	app.directive('googleplace', function() {
	    return {
	        require: 'ngModel',
	        scope: {
	            ngModel: '=',
	            details: '=?'
	        },
	        link: function(scope, element, attrs, model) {
	            var options = {
					types: ['(cities)'],
					componentRestrictions: {country: 'us'}
	            };
	            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

	            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
	                scope.$apply(function() {
	                    scope.details = scope.gPlace.getPlace();
	                    model.$setViewValue(element.val());
	                });
	            });
	        }
	    };
	});
})();
