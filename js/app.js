
var app = angular.module('pizzaPlease', ['angular-ladda']);

app.controller('SearchController', function ($scope, $http, $timeout, $log, SearchService) {
    $scope.title = 'Pizza Please';
    $scope.loading = false;
    $scope.formInvalid = false;
    $scope.city = '';

    $scope.findPizza = function () {
        $scope.loading = true;

        if ($scope.city.trim() === '') {
            $scope.formInvalid = true;
            $timeout(function () {
                $scope.loading = false;
            }, 500);

            return false;
        }

        SearchService.search($scope.city)
            .then(function (response) {
                $scope.locations = response.data.locations;

                createMap($scope.locations);

                $scope.loading = false;
            }).catch(function (data, status) {
                $log.log(status);
                $log.log(data.error);
            });
    };

    var createMap = function (locations) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({address: $scope.city}, function (result, status) {
            var latitude = result[0].geometry.location.lat();
            var longitude = result[0].geometry.location.lng();
            var mapOptions = {
                zoom: 12,
                center: { lat: latitude, lng: longitude },
                scrollwheel: false
            };

            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            locations.forEach(function(location) {
                createMarker(map, location);
            });

            var openInfoWindow = function (e, selectedMarker) {
                e.preventDefault();
                google.maps.event.trigger(selectedMarker, 'click');
            };

            setTimeout(function () {
                google.maps.event.trigger(map, 'resize');
                map.setCenter({ lat: latitude, lng: longitude });
            }, 300);
        });
    };

    var createMarker = function (map, location) {
        var infoWindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(
                location.location.coordinate.latitude,
                location.location.coordinate.longitude
            ),
            title: location.name
        });
        marker.content = '<div class="infoWindowContent">' + location.snippet_text + '</div>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent('<h5>' + marker.title + '</h5>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
    }
});

app.factory('SearchService', function ($http) {
    return {
        search: function (city) {
            return $http.get('/search?city=' + city);
        }
    }
});

app.directive('locationList', function() {
    return {
        templateUrl: 'templates/location-list.html',
        restrict: 'E',
        replace: 'true'
    };
});

/**
 * A fork of https://gist.github.com/kirschbaum/fcac2ff50f707dae75dc
 */
app.directive('googleplace', function () {
    return {
        require: 'ngModel',
        scope: {
            ngModel: '=',
            details: '=?'
        },
        link: function (scope, element, attrs, model) {
            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: 'us'}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    scope.details = scope.gPlace.getPlace();
                    model.$setViewValue(element.val());
                });
            });
        }
    };
});
