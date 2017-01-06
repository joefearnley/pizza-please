var request = require('request');
var baseUrl = 'http://localhost:5000/';

describe('Test Index', function() {
    it('should return a 200', function(done) {
        request.get(baseUrl, function(error, response, body) {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
