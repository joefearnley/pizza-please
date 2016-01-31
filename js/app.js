

(function() {
	var app = angular.module('pizzaPlease', ['ngGPlaces']);

	app.config(function(ngGPlacesAPIProvider) {
		ngGPlacesAPIProvider.setDefaults({
			types: ['food']
		});
	});

	app.controller('SearchCityController', function($scope, $http, ngGPlacesAPI) {

		$scope.title = 'Find Pizza';

		$scope.findPizza = function() {
			var address = $scope.city.split(',').join('').split(' ').join('+');;

			https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=- + address + '&radius=500&types=food&name=pizza&key=AIzaSyDEbWMdSzk7ctOn9IHfiIbSGmhW98uiQjs


			$http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyCG6qB4A5qd7wy4N2OwHDIA1HvIxD_QLVw')
			.success(function(response) {
				var lat = response.results[0].geometry.location.lat;
				var lng = response.results[0].geometry.location.lng;

				$http({
					method: 'JSONP',
					url: 'https://maps.googleapis.com/maps/api/place/textsearch/xml?query=pizza+in+' + $scope.city + '&key=AIzaSyDAIP3blcmp_GmTunYObhYLuhuw6DXovic'
					//url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + address + '&radius=500&types=food&name=pizza&key=AIzaSyDEbWMdSzk7ctOn9IHfiIbSGmhW98uiQjs'
				}).then(function(response) {
					console.log(response);
				});

				// $http.get()
				// 	.success(function(response) {
				// 		console.log(response);
				// 	});
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
