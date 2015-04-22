var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var del = require('del');

var $ = require('gulp-load-plugins')({lazy: true});




gulp.task('styles', ['clean-styles'], function() {
  log('Adding Css Prefixes');
  return gulp
    .src(config.css)
    .pipe($.autoprefixer({browsers: ['last 3 version', '> 5%']}))
    .pipe(gulp.dest(config.tmp));
});

gulp.task('clean-styles', function(done){
  var files = config.tmp + '**/*.css';
  clean(files, done);
});

function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}


/**
 * Module 5
 */
gulp.task('vet', function () {
  log('Analyzing source with JSHint and JSCS');
  return gulp.src(config.alljs)
    .pipe($.if(args.verbose, $.print()))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

function log(msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}