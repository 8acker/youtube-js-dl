'use strict';

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var uglify = require('gulp-uglifyjs');
var Server = require('karma').Server;

gulp.task('lint', function () {
  return gulp.src(['src/**/*.js'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
});

gulp.task('concat', function() {
  return gulp.src(['src/md5.js', 'src/angular-gravatar-image.js'])
    .pipe(concat('angular-gravatar-image.js'))
    .pipe(gulp.dest('./'));
});

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('watch', function() {
  watch('src/*.js', batch(function(events, done) {
      gulp.start('build', done);
    }));
});

gulp.task('uglify', function() {
  return gulp.src('angular-gravatar-image.js')
    .pipe(uglify('angular-gravatar-image.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('build', ['lint', 'test', 'concat', 'uglify']);

gulp.task('default', ['build']);