'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

/**
 * @TODO ES6 Babel compilant methods for require JSX files
 */

//var browserify =

gulp.task('default', ['browser-sync']);

gulp.task('browser-sync', ['nodemon'], function() {

	browserSync({
        //logSnippet: false,
        proxy: "localhost:" + (process.env.PORT || 3000),
        files: ["src/**"],
        watchOptions: {
            ignored: 'comments.json'
        }
    });
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: './app/server.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true;
		}
	});
});
