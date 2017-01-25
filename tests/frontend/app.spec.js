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
    
    beforeEach(angular.mock.module('pizzaPlease')); 

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
        var $httpBackend;

        beforeEach(angular.mock.inject(function(_$controller_, $rootScope, _SearchService_) {
            scope = $rootScope.$new();
            SearchService = _SearchService_;
            searchController = _$controller_('SearchController', {
                $scope: scope,
                SearchService: SearchService
            });

            scope.city = 'Norton Shores, MI';
        }));

        it('should exist', function() {
            expect(searchController).toBeDefined();
        });

        describe('initialize controller', function() {
            it('should have title Pizza Please', function() {
                expect(scope.title).toBe('Pizza Please');
            });

            it('should not be loading', function() {
                expect(scope.loading).toBe(false);
            });

            it('should have a valid form', function() {
                expect(scope.formInvalid).toBe(false);
            });

            it('shold have a method named findPizza', function() {
                expect(scope.findPizza).toBeDefined();
            });
        });

        describe('find pizza', function() {
            
            beforeEach(inject(function(_$httpBackend_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('/search?city=' + scope.city)
                    .respond(200, fakeResponse);
            }));

            it('should set form to invalid when nothing is entered', function() {
                scope.city = '';
                scope.findPizza();

                expect(scope.formInvalid).toBe(true);
            });

            it('should be loading', function() {
                scope.findPizza();

                expect(scope.loading).toBe(true);
            });

            it('should find locations', function() {
                scope.findPizza();

                $httpBackend.flush();

                expect(scope.locations).toBeDefined();
            });

            it('should get location details', function() {
                scope.findPizza();

                $httpBackend.flush();

                var firstLocation = scope.locations[0];
                expect(firstLocation.name).toBe("Mr Scrib's Pizza");
                expect(firstLocation.display_phone).toBe("+1-231-733-1857");
                expect(firstLocation.location.display_address[0]).toBe("3044 Henry St");
                expect(firstLocation.location.display_address[1]).toBe("Muskegon, MI 49441");
            });
        });
        
        describe('Location list directive', function() {
            var element;
            var locations;
            
            beforeEach(inject(function($compile) {
                element = $compile('<location-list></location-list>')(scope);
                scope.$digest();
                
                locations = element.find('.location');
            }));
    
            describe('Initialization', function() {
                it('should not show after page is initialized', function() {
                    expect(locations.length).toBe(0);
                });
            });
    
            describe('Location Search', function() {
                it('should show locations list after searching for pizza', function() {
                    //expect(scope.city).toBe('Norton Shores, MI');
                    
                    scope.locations = [{
                        name: "Mr Scrib's Pizza",
                        display_phone: "+1-231-733-1857",
                        location: {
                            display_address: [
                                "3044 Henry St",
                                "Muskegon, MI 49441"
                            ]
                        }
                    },{
                        name: "Vito's Pizza",
                        display_phone: "+1-231-555-5555",
                        location: {
                            display_address: [
                                "123 Main St",
                                "Grand Haven, MI 49441"
                            ]
                        }
                    }];

                    scope.findPizza();
                    
                    locations = element.find('.location');
                    
                    expect(locations.length).toBe(2);
                });
            });
        });
    });


    describe('Search Service', function() {
        var SearchService;
        var $httpBackend;
        var scope;
        var city = 'Norton Shores, MI';

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
        });

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
