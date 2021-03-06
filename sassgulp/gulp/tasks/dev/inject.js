var gulp = require('gulp');
var inject = require("gulp-inject");
var config = require('../../config');

gulp.task("injectDev", ['cssDev', 'copyVendorDev', 'sassDev'], function () {

  return gulp.src(config.html.index)
      .pipe(inject(
          gulp.src(
              [].concat(
                config.js.vendorInject,
                config.css.vendorInject
              )),
          {
            name: "vendor",
            ignorePath: "build/",
            addRootSlash: false
          }
      ))
      .pipe(inject(gulp.src(config.stage + config.js.inject),
          {
            ignorePath: 'build/',
            addRootSlash: false
          }
      ))
      .pipe(inject(gulp.src(config.stage + config.css.inject),
          {
            ignorePath: 'build/',
            addRootSlash: false
          }
      ))
      .pipe(gulp.dest(config.stage));
});
