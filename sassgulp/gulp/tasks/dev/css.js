var gulp = require('gulp');
var flatten = require('gulp-flatten');
var concat = require('gulp-concat');
var config = require('../../config');

gulp.task("cssDev", ["copyDevCss", "copyVendorCss"]);

gulp.task("copyDevCss", ["clean", 'sassDev'], function () {
  return gulp.src(config.css.src, {base: './src'})
      .pipe(gulp.dest(config.stage + config.css.dest));
});

gulp.task("copyVendorCss", ["clean", 'sassDev'], function () {
  return gulp.src(config.css.vendorSrc)
      .pipe(flatten())
      .pipe(gulp.dest(config.stage + config.css.vendorDest));
});