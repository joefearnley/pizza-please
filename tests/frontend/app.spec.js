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
        var city = 'Norton Shores, MI';

        beforeEach(angular.mock.module('pizzaPlease'));

        beforeEach(inject(function(_$httpBackend_, _SearchService_) {
            $httpBackend = _$httpBackend_;
            SearchService = _SearchService_;

            $httpBackend.when('GET', '/search?city=' + city).respond({});
        }));

        it('should exist', function() {
            expect(SearchService).toBeDefined();
        });

        it('should return a promise', function () {
          expect(SearchService.search(city).then).toBeDefined();
        });
    });
});
