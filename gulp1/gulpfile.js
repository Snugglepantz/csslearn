var gulp = require('gulp');
jshint = require('gulp-jshint');
jscs = require('gulp-jscs');
util = require('gulp-util');

gulp.task('vet', function () {
  log('Analyzing source with JSHint and JSCS');
  return gulp.src([
    './src/**/*.js',
    './*.js'
  ])
    .pipe(jscs())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-sylish', {verbose: true}))
    .pipe(jshint.reporter('fail'));
});

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        util.log(util.colors.blue(msg[item]));
      }
    }
  } else {
    util.log(util.colors.blue(msg));
  }
}