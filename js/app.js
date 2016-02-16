
(function() {
	var app = angular.module('pizzaPlease', []);

	app.controller('SearchController', function($scope, $http, $log, locationService) {

		$scope.title = 'Pizza Please';
		$scope.isLoading = false;
		$scope.resultsLoaded = false;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				$scope.$apply(function() {
					$scope.position = position;
					var latlng = {
						lat: $scope.position.coords.latitude,
						lng: $scope.position.coords.longitude
					};

					var geocoder = new google.maps.Geocoder();
					geocoder.geocode({'location': latlng}, function(results, status) {
						if (status === google.maps.GeocoderStatus.OK) {
							if (results[1]) {
								$scope.city = results[1].formatted_address;
								$scope.$apply();
							}
						} else {
							console.log('Geocoder failed due to: ' + status);
						}
					});
				});
			});
		}

		$scope.findPizza = function() {
			$scope.isLoading = true;
			$scope.resultsLoaded = false;

			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({ address : $scope.city }, function (result, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					var latitude = result[0].geometry.location.lat();
					var longitude = result[0].geometry.location.lng();
					createMap(latitude, longitude);
				}
			});
		}

		var createMap = function(latitude, longitude) {
			var mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(latitude, longitude),
				scrollwheel: false
			}
			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
			$scope.markers = [];

			locationService.getLocations($scope.city)
				.success(function(response) {
					$scope.locations = response.locations;
					for (i = 0; i < $scope.locations.length; i++){
						createMarker($scope.locations[i]);
					}

					$scope.openInfoWindow = function(e, selectedMarker) {
						e.preventDefault();
						google.maps.event.trigger(selectedMarker, 'click');
					}

					$scope.isLoading = false;
					$scope.resultsLoaded = true;
				})
				.error(function(data, status) {
					$log.log(status);
					$log.log(data.error);
				});
		}

		var createMarker = function (location) {
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(
					location.location.coordinate.latitude,
					location.location.coordinate.longitude
				),
				title: location.name
			});
			marker.content = '<div class="infoWindowContent">' + location.snippet_text + '</div>';

			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h5>' + marker.title + '</h5>' + marker.content);
				infoWindow.open($scope.map, marker);
			});

			$scope.markers.push(marker);
		}
	});

	app.service('locationService', function($http) {
		var locations = [];
		this.getLocations = function(city) {
			return $http.get('/search?city=' + city);
		}
	});

	/**
	 * A fork of https://gist.github.com/kirschbaum/fcac2ff50f707dae75dc
	 */
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
