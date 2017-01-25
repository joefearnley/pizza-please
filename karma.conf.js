
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDEbWMdSzk7ctOn9IHfiIbSGmhW98uiQjs&libraries=places',
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'js/ladda/*.js',
            'js/app.js',
            'tests/frontend/*.js',
            'templates/*.html'
        ],
        exclude: [],
        preprocessors: {
            'templates/*.html': 'html2js'
        },
        ngHtml2JsPreprocessor: {
            moduleName: 'templates'
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true,
        concurrency: Infinity
    });
}
