
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
        var url = baseUrl + '/search?city=' + city;

        it('should return status code 200', function() {
            request.get(url, function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });

        it('should return results', function() {
            request.get(url, function(error, response, body) {
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
