var baseUrl = 'http://localhost:5000';
var nock = require('nock');
var request = require('supertest')(baseUrl);

describe('GET /', function() {

    beforeEach(function() {
        nock(baseUrl).get('/').reply(200);
    });

    it('should return a 200', function(done) {
        request.get('/').end(function (error, response) {
            expect(response.status).toBe(200);
            done();
        });
    });
});
