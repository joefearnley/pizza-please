describe('Pizza Please App Test Suite', function() {
    describe('Main Controller', function() {
        var controller;
        var scope;

        beforeEach(angular.mock.module('pizzaPlease'));

        describe('App loaded and is working', function() {
            it('loaded', function() {
                expect(app).toBeDefined();
            });
        });
    });

})
