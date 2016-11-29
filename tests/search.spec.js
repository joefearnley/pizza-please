
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
        });

        it('should return status code 200', function() {
            request.get(url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });

        it('should return correct results', function() {
            nock(baseUrl)
                .get('/search?city=' + city)
                .reply(200, fakeResponse);

            request.get(url, function(error, response, body) {
                console.log(response);
                expect(response.success).toBe(true);

                // It Should....
                //
                // return id
                // return location name
                //
                // return location phone number
            });
        });
    });
});
