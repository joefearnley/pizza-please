var baseUrl = 'http://localhost:5000';
var nock = require('nock');
var request = require('supertest')(baseUrl);
const app = require('../../src/app');

describe('Test the root path', () => {
    test('It should response the GET method', (done) => {
        request(app).get('/').then((response) => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});

describe('GET /search', function() {
  const city = 'Muskegon, MI';

  describe('/search?city=', function() {
    beforeEach(function() {
      // nock(baseUrl).get('/search?city=').reply(422); 
    });
  
    test('It should return 404 when no city is provided', async () => {
        const response = await request(app).get('/search');
        expect(response.statusCode).toBe(404);
    });
  });


  // describe('/search?city=', function() {
  //   beforeEach(function() {
  //     nock(baseUrl).get('/search?city=').reply(422); 
  //   });
  
  //   it('should return 422 when no city is provided', function(done) {
  //     request.get('/search?city=').end(function (error, response) {
  //       expect(response.status).toBe(422);
  //       done();
  //     });
  //   });
  // });

  //   describe('GET /search', function() {
  //       var searchUrl = '/search?city=' + city;
  //       var fakeResponse = {
  //           success: true,
  //           error: null,
  //           locations: [
  //               {
  //                   name: "Mr Scrib's Pizza",
  //                   display_phone: "+1-231-733-1857",
  //                   location: {
  //                       display_address: [
  //                           "3044 Henry St",
  //                           "Muskegon, MI 49441"
  //                       ]
  //                   }
  //               },{},{}
  //           ]
  //       };

  //       beforeEach(function() {
  //           nock(baseUrl).get('/search')
  //               .query({
  //                   city: city
  //               })
  //               .reply(200, fakeResponse);
  //       });

  //       it('should return status code 200', function(done) {
  //           request.get(searchUrl).end(function (error, response) {
  //               expect(response.status).toBe(200);
  //               done();
  //           });
  //       });

  //       it('should return a successful response', function(done) {
  //           request.get(searchUrl).end(function (error, response) {
  //               expect(response.body.success).toBe(true);
  //               done();
  //           });
  //       });

  //       it('should return locations', function(done) {
  //           request.get(searchUrl).end(function (error, response) {
  //               expect(response.body.locations).toBeDefined();
  //               expect(response.body.locations.length).toBe(3);
  //               done();
  //           });
  //       });

  //       it('should return correct location information', function(done) {
  //           request.get(searchUrl).end(function (error, response) {
  //               var firstLocation = response.body.locations[0];

  //               expect(firstLocation.name).toBe("Mr Scrib's Pizza");
  //               expect(firstLocation.display_phone).toBe("+1-231-733-1857");
  //               expect(firstLocation.location.display_address[0]).toBe("3044 Henry St");
  //               expect(firstLocation.location.display_address[1]).toBe("Muskegon, MI 49441");
  //               done();
  //           });
  //       });

  //   });
});
