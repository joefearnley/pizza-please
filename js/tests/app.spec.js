describe('Pizza Please App Test Suite', function() {
    var searchController;
    var scope;

    describe('App loaded and is working', function() {
        it('loaded', function() {
            expect(app).toBeDefined();
        });
    });

    describe('Search Controller', function() {

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope){
            scope = $rootScope.$new();
            scope.city = 'Norton Shores, MI';
            searchController = _$controller_('SearchController', { $scope: scope });
        }));

        it('should exist', function() {
            expect(searchController).toBeDefined();
        });

        describe('initialize controller', function() {
            it('should have title Pizza Please, not be loading, and not have results loaded', function() {
                expect(scope.title).toBe('Pizza Please');
            });

            it('should not be loading', function() {
                expect(scope.isLoading).toBe(false);
            });

            it('should have not have results', function() {
                expect(scope.resultsLoaded).toBe(false);
            });

            it('shold have a method named findPizza', function() {
                expect(scope.findPizza).toBeDefined();
            });
        });

        describe('find pizza', function() {
            it('should have a city', function() {
                expect(scope.city).toBeDefined();
            });

            it('should be loading', function() {
                scope.findPizza();

                expect(scope.isLoading).toBe(true);
                expect(scope.resultsLoaded).toBe(false);
            });

            it('should find pizza locations', function() {
                scope.findPizza();

                // should have locations
                expect(scope.locations).toBeDefined();
                //expect(scope.locations.length).toBe(20);

                // should have a map
                //expect(scope.locations.length).toBe(20);

                // should have markers
                //expect(scope.map).toBeDefined();

                //expect(scope.isLoading).toBe(false);
                //expect(scope.resultsLoaded).toBe(true);
            });

        });
    });
});

describe('Search Service', function() {
    var LocationService ;

    beforeEach(angular.mock.module('pizzaPlease'));

    beforeEach(inject(function(_SearchService_) {
        SearchService = _SearchService_;
    }));

    it('should exist', function() {
        expect(SearchService).toBeDefined();
    });

    describe('seach', function() {

        var locations;

        it('should find locations', function() {
            locations = SearchService.search();

            // should have locations (length greateer than 1)''
            // legnth should be 20?
        });
    });

});
