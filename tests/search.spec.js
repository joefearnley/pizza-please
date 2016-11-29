
var request = require('request');
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
        it('returns status code 200', function() {
            var url = baseUrl + '/search?city=' + city;
            request.get(url, function(error, response, body) {
                expect(response.statusCode).toBe(200);

                // It Should....
                //
                // return id
                //
                // return location name
                //
                // return location phone number
            });
        });
    });
});
