var request = require('request');
var base_url = 'http://localhost:5000/';

describe('Search', function() {
    describe('validate GET /search', function() {
        it('should return 422 when no city is provided', function() {
            request.get(base_url, function(error, response, body) {
                expect(response.statusCode).toBe(422);
            });
        });
    });

    describe('GET /seach', function() {

        describe('validation', function() {

            it('return error when no ')

            it('returns status code 200', function() {

        });
    });
});
