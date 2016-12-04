describe('Pizza Please App Test Suite', function() {
    var fakeResponse = {
        success: true,
        error: null,
        locations: [
            {
                name: "Mr Scrib's Pizza",
                display_phone: "+1-231-733-1857",
                location: {
                    display_address: [
                        "3044 Henry St",
                        "Muskegon, MI 49441"
                    ]
                }
            },{},{}
        ]
    };
    var city = 'Norton Shores, MI';

    describe('App loaded', function() {
        it('should be loaded', function() {
            expect(app).toBeDefined();
        });
    });

    describe('Search Controller', function() {
        var searchController;
        var scope;
        var SearchService;
        var geocoder;

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope, _SearchService_) {
            scope = $rootScope.$new();
            SearchService = _SearchService_;
            searchController = _$controller_('SearchController', {
                $scope: scope,
                SearchService: SearchService
            });
        }));

        it('should exist', function() {
            expect(searchController).toBeDefined();
        });

        describe('initialize controller', function() {
            it('should have title Pizza Please', function() {
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

            beforeEach(inject(function(_$httpBackend_, _SearchService_) {
                $httpBackend = _$httpBackend_;
                SearchService = _SearchService_;
            }));

            it('should be loading', function() {
                scope.findPizza();

                expect(scope.isLoading).toBe(true);
                expect(scope.resultsLoaded).toBe(false);
            });

            it('should find locations', function() {
                scope.findPizza();

                $httpBackend.whenGET('/search?city=' + city)
                    .respond(200, fakeResponse);

                $httpBackend.flush();

                expect(scope.locations).toBeDefined();
            });
        });
    });

    describe('Search Service', function() {
        var SearchService;
        var $httpBackend;
        var scope;

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(inject(function(_$httpBackend_, _SearchService_) {
            $httpBackend = _$httpBackend_;
            SearchService = _SearchService_;
        }));

        describe('initialization', function() {
            it('should exist', function() {
                expect(SearchService).toBeDefined();
            });

            it('should return a promise', function () {
              expect(SearchService.search(city).then).toBeDefined();
            });
        })

        describe('search', function() {
            var result;

            beforeEach(function () {
                result = {};
                $httpBackend.whenGET('/search?city=' + city)
                    .respond(200, fakeResponse);
            });

            it('should perform a successful search', function() {
                expect(result).toEqual({});
                SearchService.search(city).then(function(res) {
                    result = res.data;
                });

                $httpBackend.flush();

                expect(result.success).toBe(true);
            });

            it('should return 3 locations', function() {
                SearchService.search(city).then(function(res) {
                    result = res.data;
                });
                $httpBackend.flush();
                expect(result.locations.length).toBe(3);
            });

            it('should return location details', function() {
                SearchService.search(city).then(function(res) {
                    result = res.data;
                });
                $httpBackend.flush();

                var firstLocation = result.locations[0];
                expect(firstLocation.name).toBe("Mr Scrib's Pizza");
                expect(firstLocation.display_phone).toBe("+1-231-733-1857");
                expect(firstLocation.location.display_address[0]).toBe("3044 Henry St");
                expect(firstLocation.location.display_address[1]).toBe("Muskegon, MI 49441");
            });
        })
    });
});
