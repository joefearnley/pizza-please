
(function() {
	var app = angular.module('pizzaPlease', ['ngGPlaces']);

	app.controller('SearchController', function($scope, $http, ngGPlacesAPI) {

		$scope.title = 'Pizza Please';
		$scope.isLoading = false;
		$scope.resultsLoaded = false;

		$scope.findPizza = function() {
			$scope.isLoading = true;
			$scope.resultsLoaded = false;
			$http.get('http://localhost:3000/search?city=' + $scope.city).success(function(response) {
				if (response.success) {
					$scope.locations = response.locations;
				} else {
					console.log(response.error);
				}

				$scope.isLoading = false;
				$scope.resultsLoaded = true;
			});
		}
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
