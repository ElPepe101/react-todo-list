'use strict'
var gulp = require('gulp')
var runSequence = require('run-sequence')
var browserSync = require('browser-sync')
var reload = browserSync.reload
var nodemon = require('gulp-nodemon')
var webpack = require('webpack-stream') // https://www.twilio.com/blog/2015/08/setting-up-react-for-es6-with-webpack-and-babel-2.html

gulp.task('default', function () {
  runSequence(
    'build',
    'nodemon',
    'browsersync'
  )
})

gulp.task('build', ['webpack'], function () {
  gulp.src(
    ['src/**/*.{html,css}'],
    {base: './src'}
  )
  .pipe(gulp.dest('./dist'))

  gulp.watch(['src/**'], ['build'])
  gulp.watch(['dist/**'], reload)
})

gulp.task('webpack', function () {
  return gulp.src('src/main.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/public/'))
})

gulp.task('browsersync', function () {
  browserSync.init(null, {
    proxy: 'localhost:' + (process.env.PORT || 3000),
    port: 7000
  })
})

gulp.task('nodemon', function (cb) {
  var started = false

  return nodemon(
    {
      script: 'server/server.js',
      ignore: '**/*'
    })
    .on('start', function () {
      // to avoid nodemon being started multiple times
      // thanks @matthisk
      if (!started) {
        cb()
        started = true
      }
    })
})
