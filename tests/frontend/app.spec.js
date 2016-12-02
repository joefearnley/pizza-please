describe('Pizza Please App Test Suite', function() {
    var searchController;
    var scope;
    var SearchService;
    var geocoder;

    describe('App loaded', function() {
        it('should be loaded', function() {
            expect(app).toBeDefined();
        });
    });

    describe('Search Controller', function() {
        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope, _SearchService_) {
            scope = $rootScope.$new();
            SearchService = _SearchService_;
            searchController = _$controller_('SearchController', {
                $scope: scope,
                SearchService: SearchService
            });

            var constructorSpy = spyOn(google.maps, 'Geocoder');
            geocoder = jasmine.createSpyObj('Geocoder', ['geocode']);
            constructorSpy.and.returnValue(geocoder);
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
            it('should be loading', function() {
                scope.findPizza();
                
                expect(scope.isLoading).toBe(true);
                expect(scope.resultsLoaded).toBe(false);
            });

            it('should call the geocoder', function() {
                scope.findPizza();
                
                expect(geocoder.geocode).toHaveBeenCalled();
            });
        });
    });

    describe('Search Service', function() {
        var SearchService;
        var $httpBackend;
        var $q;
        var city = 'Norton Shores, MI';
        var fakeResponse = {
            success: true,
            error: null,
            display_phone: "+1-231-733-1857",
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
                },{},{}
            ]
        };

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(inject(function(_$httpBackend_, _$q_, _SearchService_) {
            $httpBackend = _$httpBackend_;
            $q = _$q_;
            SearchService = _SearchService_;
        }));

        it('should exist', function() {
            expect(SearchService).toBeDefined();
        });

        it('should return a promise', function () {
          expect(SearchService.search(city).then).toBeDefined();
        });

        describe('search', function() {
            var result;
            
            beforeEach(inject(function() {
                result = {};

                //spyOn(SearchService, 'search').and.callThrough();
            }));

            it('should return search results', function() {
                $httpBackend.expectGET('/search?city=' + city)
                    .respond(200, fakeResponse);
                
                //expect(SearchService.search).not.toHaveBeenCalled();
                expect(result).toEqual({});

                SearchService.search(city)
                    .then(function(res) {
                        result = res;
                        
                        
                        expect(result.success).toBe(true);
                        expect(result.locations.length).toBe(3);
                        
                        var firstLocation = result.locations[0];
                        
                        expect(firstLocation.name).toBe("Mr Scrib's Pizza");
                        expect(firstLocation.display_phone).toBe("+1-231-733-1857");
                        expect(firstLocation.location.display_address[0]).toBe("3044 Henry St");
                        expect(firstLocation.location.display_address[0]).toBe("Muskegon, MI 49441");
                    });
                    
                $httpBackend.flush();

                //expect(SearchService.search).toHaveBeenCalledWith(city);
            });
        })
    });
});
