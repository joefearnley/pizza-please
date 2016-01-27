
(function() {
	var app = angular.module('pizzaPlease', ['ui.bootstrap']);

	app.controller('SearchCityController', function($scope, $http) {

		//$scope.service = cityService;
		$scope.title = 'Find Pizza';

		$http.get('airplanes.json').success(function(data) {
			$scope.airplanes = data;
		});
	});

	// app.service('cityService', function($http) {
	// 	//var url = 'http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=USCA&template=<geobytes%20city>,%20<geobytes%20code>&q=';
	// });

	// define factory for data source
	// myApp.factory('States', function(){
	// 	var states = [
	// 		"Alabama", "Alaska", "Arizona", "Arkansas", "California",
	// 		"Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
	// 		"Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
	// 		"Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
	// 		"Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
	// 		"Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
	// 		"New York", "North Dakota", "North Carolina", "Ohio", "Oklahoma",
	// 		"Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
	// 		"South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
	// 		"Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
	// 	];
	// 	return states;
	// });
})();
