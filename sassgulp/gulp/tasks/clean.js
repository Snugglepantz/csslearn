var gulp = require('gulp');
var rimraf = require('rimraf');
var config = require('../config');

gulp.task('clean', ['cleanStage', 'cleanRelease']);

gulp.task('cleanStage', function(cb) {
  rimraf(config.stage, cb);
});

gulp.task('cleanRelease', function(cb) {
  rimraf(config.release, cb);
});