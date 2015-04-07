var gulp = require('gulp');
var flatten = require('gulp-flatten');
var config = require('../../config');


gulp.task("copyVendorDev", ["copyVendorJSDev", "copyVendorCSSDev"]);

gulp.task("copyVendorJSDev", ['clean'], function() {
  return gulp.src(config.js.vendorSrc)
    .pipe(flatten())
    .pipe(gulp.dest(config.stage + config.js.vendorDest));
});

gulp.task("copyVendorCSSDev", ['clean'], function() {
  return gulp.src(config.css.vendorSrc)
    .pipe(flatten())
    .pipe(gulp.dest(config.stage + config.css.vendorDest));
});