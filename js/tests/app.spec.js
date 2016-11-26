describe('Pizza Please App Test Suite', function() {
    describe('App loaded and is working', function() {
        it('loaded', function() {
            expect(app).toBeDefined();
        });
    });

    describe('Search Controller', function() {
        var searchController;
        var scope;
        var city = 'Norton Shores, MI';

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope){
            scope = $rootScope.$new();
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
            scope.findPizza();

            it('should have a city', function() {
                expect(scope.city).toBeDefined();
            });

            it('should be loading', function() {
                expect(scope.isLoading).toBe(true);
                expect(scope.resultsLoaded).toBe(false);
            });
        });

    });
});

// describe('Search Service', function() {
//     var LocationService ;
//
//     beforeEach(angular.mock.module('pizzaPlease'));
//
//     beforeEach(inject(function(_SearchService_) {
//         SearchService = _SearchService_;
//     }));
//
//     it('should exist', function() {
//         expect(SearchService).toBeDefined();
//     });
//
//     describe('get', function() {
//         var locations;
//
//         it('should ', function() {
//             locations = SearchService.get(1);
//             //
//             // expect(user.id).toBe(1);
//             // expect(user.name).toBe('John Doe');
//         });
//     });
//
// });
