describe('Pizza Please App Test Suite', function() {
    var searchController;
    var scope;
    var $httpBackend;

    describe('App loaded and is working', function() {
        it('loaded', function() {
            expect(app).toBeDefined();
        });
    });

    describe('Search Controller', function() {

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope) {
            scope = $rootScope.$new();
            scope.city = 'Norton Shores, MI';
            searchController = _$controller_('SearchController', { $scope: scope });
        }));

        beforeEach(inject(function($injector) {
            $httpBackend = $injector.get('$httpBackend');
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

                var fakeResponse = {
                    success: true,
                    error: null,
                    locations: [
                        {
                            name: "Mr Scrib's Pizza",
                            phone: "2317331857",
                            location: {
                                city: "Muskegon",
                                display_address: [
                                    "3044 Henry St",
                                    "Muskegon, MI 49441"
                                ]
                            }
                        }
                    ]
                };

                // $httpBackend.when('GET', '/search')
                //     .respond(200, fakeResponse);

                scope.findPizza();

                // should have locations
                //expect(fakeResponse.locations).toBeDefined();
                // expect(scope.locations.length).toBe(1);

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
    var LocationService;
    var $httpBackend;

    beforeEach(angular.mock.module('pizzaPlease'));

    beforeEach(inject(function(_SearchService_, $rootScope, _$httpBackend_) {
        SearchService = _SearchService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function() {
        expect(SearchService).toBeDefined();
    });

    describe('search', function() {

        var fakeResponse = {
            success: true,
            error: null,
            locations: [
                {
                    name: "Mr Scrib's Pizza",
                    phone: "2317331857",
                    location: {
                        city: "Muskegon",
                        display_address: [
                            "3044 Henry St",
                            "Muskegon, MI 49441"
                        ]
                    }
                }
            ]
        };

        $httpBackend.when('GET', '/search')
            .respond(200, fakeResponse);

        it('should find locations', function() {
            $httpBackend.flush();

            locations = SearchService.search();

            expect(location.length).toBe(1);
        });
    });

});
