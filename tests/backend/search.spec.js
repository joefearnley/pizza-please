
var request = require('request');
var nock = require ('nock');
var baseUrl = 'http://localhost:5000/';
var city = 'Norton Shores, MI'

describe('Search', function() {
    describe('validate GET /search', function() {
        it('should return 422 when no city is provided', function() {
            request.get((baseUrl + '/search?city='), function(error, response, body) {
                expect(response.statusCode).toBe(500);
            });
        });
    });

    describe('GET /seach', function() {
        var url = baseUrl + '/search?city=' + city;
        var fakeResponse = {};

        beforeEach(function() {
            fakeResponse = {
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
            
            nock(baseUrl)
                .get('/search?city=' + city)
                .reply(200, fakeResponse);
        });

        it('should return status code 200', function() {
            request.get(url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });

        it('should return a successful response', function() {
            request.get(url, function(error, response, body) {
                expect(response.success).toBe(true);
            });
        });
        
        it('should return locations', function() {
            request.get(url, function(error, response, body) {
                expect(response.locations).toBeDefined();
                expect(response.locations.length).toBe(3);
            });
        });

        it('should return correct location information', function() {
            request.get(url, function(error, response, body) {
                var firstLocation = response.locations[0];
                
                expect(firstLocation.name).toBe("Mr Scrib's Pizza");
                expect(firstLocation.display_phone).toBe("+1-231-733-1857");
                expect(firstLocation.location.display_address[0]).toBe("3044 Henry St");
                expect(firstLocation.location.display_address[0]).toBe("Muskegon, MI 49441");
            });
        });
    });
});
