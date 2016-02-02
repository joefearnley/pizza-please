

(function() {
	var app = angular.module('pizzaPlease', ['ngGPlaces']);

	app.controller('SearchCityController', function($scope, $http, ngGPlacesAPI) {

		$scope.title = 'Find Pizza';

		$scope.findPizza = function() {
			var address = $scope.city.split(',').join('').split(' ').join('+');

			$http.get('http://localhost:3000?city=' + $scope.city).success(function(response) {
				console.log(response);
			});

			// $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCG6qB4A5qd7wy4N2OwHDIA1HvIxD_QLVw')
			// 	.success(function(response) {
			// 		var lat = response.results[0].geometry.location.lat;
			// 		var lng = response.results[0].geometry.location.lng;
			// 		var query = 'pizza' + $scope.city;
			//
			// 		$scope.data = ngGPlacesAPI.textSearch({ latitude: lat, longitude: lng, query: query })
			// 			.then(function(data){
			// 				console.log(data);
			// 				return data;
			// 		  	});
			// 	});
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
