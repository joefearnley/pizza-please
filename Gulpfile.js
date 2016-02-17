var gulp = require('gulp');
var server = require('gulp-express');

gulp.task('default', function () {
    console.log('Gulp and running!')
    server.run(['server.js']);

    gulp.watch(['*.html', 'css/*.css', 'js/*.js'], server.notify);
    gulp.watch(['server.js'], [server.run]);
});
