var gulp = require('gulp');
var flatten = require('gulp-flatten');
var config = require('../../config');


gulp.task("copyVendorDev", ["copyVendorJSDev", "copyVendorCSSDev", 'copyJSDev']);

gulp.task("copyVendorCSSDev", ['clean'], function() {
  return gulp.src(config.css.vendorSrc)
      .pipe(flatten())
      .pipe(gulp.dest(config.stage + config.css.vendorDest));
});

gulp.task("copyJSDev", ['clean'], function() {
  return gulp.src(config.js.src, {base: 'src/'})
      .pipe(gulp.dest(config.stage));
});

gulp.task("copyVendorJSDev", ['clean'], function() {
  return gulp.src(config.js.vendorSrc)
      .pipe(flatten())
      .pipe(gulp.dest(config.stage + config.js.vendorDest));
});
