// Suite
describe('Testing SearchCityController', function() {
	var $controller;

	// Setup for all tests
	beforeEach(function(){
		// loads the app module
		module('pizzaPlease');
		inject(function(_$controller_) {
			// inject removes the underscores and finds the $controller Provider
			$controller = _$controller_;
		});
	});

	// Test (spec)
	it('should say "Find Pizza"', function() {
		var $scope = {};

		var controller = $controller('SearchCityController', { $scope: $scope });

		expect($scope.title).toEqual('Find Pizza');
	});

});
