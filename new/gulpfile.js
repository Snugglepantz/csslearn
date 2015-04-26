var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');

var config = require('./gulp.config')();

var $ = require('gulp-load-plugins')({lazy: true});

/*****************************************************************
 * Main
 *****************************************************************/
//Dev
gulp.task('default', ['inject', 'html', 'css', 'js', 'fonts', 'images']);
//Dist

/*****************************************************************
 *
 * Clean
 *
 *****************************************************************/
//Dev
gulp.task('clean', ['cleanDist', 'cleanTmp', 'cleanSass']);

gulp.task('cleanDist', function (done) {
  var files = config.build;
  clean(files, done);
});

gulp.task('cleanTmp', function (done) {
  var files = config.tmp;
  clean(files, done);
});

gulp.task('cleanSass', function (done) {
  var files = config.css.sassTemp;
  clean(files, done);
});


/*****************************************************************
 *
 * CSS
 *
 *****************************************************************/
gulp.task('css', ['less']);
//Less
gulp.task('less', ['clean'], function () {
  log('Compiling Less --> CSS');
  return gulp
    .src(config.css.less)
    .pipe($.less())
    .pipe(gulp.dest(config.tmp));
});

gulp.task('sass', ['copyVar']);

gulp.task('copySass', ['clean'], function() {
  return gulp.src(config.css.sassVendor)
    .pipe(gulp.dest(config.css.sassTemp));
});

gulp.task('copyVar', ['copySass'], function() {
  return gulp.src(config.css.sassVarSrc)
    .pipe(gulp.dest(config.css.sassVarDest));
});
//Dist

/*****************************************************************
 *
 * JS
 *
 *****************************************************************/
gulp.task('js', ['lint']);
//Lint
gulp.task('lint', function () {
  log('Running JSHint');
  return gulp.src(config.js.src)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

//Dist

/*****************************************************************
 *
 * HTML
 *
 *****************************************************************/
gulp.task('html', ['clean'], function () {
  if (!args.prod) {
    return gulp
      .src(config.html, {base: 'src/'})
      .pipe(gulp.dest(config.build));
  } else {
    return gulp
      .src(config.html)
      .pipe($.angularTemplatecache('templates.js', {
        module: 'app.core',
        standalone: false
      }))
      .pipe(gulp.dest(config.tmp));
  }
});


/*****************************************************************
 *
 * Fonts
 *
 *****************************************************************/
//Dev
gulp.task('fonts', ['clean'], function () {
  log('Copying Fonts');
  return gulp
    .src(config.fonts.src)
    //.pipe($.flatten())
    .pipe(gulp.dest(config.fonts.dest));
});

/*****************************************************************
 *
 * Images
 *
 *****************************************************************/
//Dev
gulp.task('images', ['clean'], function () {
  log('Copying Images');
  return gulp
    .src(config.images.src)
    .pipe(gulp.dest(config.images.dest));
});

/*****************************************************************
 *
 * Injection
 *
 *****************************************************************/
//Dev
gulp.task('inject', ['js', 'css', 'sass'], function () {
  log('Injecting Dependencies into index.html');
  return gulp
    .src(config.index)
    //VendorJS
    .pipe($.inject(
      gulp.src(config.js.vendorSrc)
        .pipe($.flatten())
        .pipe($.if(args.prod, $.concat(config.js.vendorFile)))
        .pipe($.if(args.prod, $.uglify()))
        .pipe(gulp.dest(config.js.vendorDest)),
      config.injectBower))
    //VendorCSS
    //.pipe($.inject(
    //  gulp.src(config.css.vendorSrc)
    //    .pipe($.flatten())
    //    .pipe($.if(args.prod, $.concat(config.css.vendorFile)))
    //    .pipe($.if(args.prod, $.minifyCss()))
    //    .pipe(gulp.dest(config.css.vendorDest)),
    //  config.injectBower))
    .pipe($.inject(
      gulp.src(config.css.sassSrc)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
          includePaths: [config.css.sassTemp],
          errLogToConsole: true
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.css.vendorDest)),
        config.injectBower))

    //AppJS
    .pipe($.inject(
      gulp.src(config.js.src, {base: 'src/'})
        .pipe($.sourcemaps.init())
        .pipe($.concat(config.js.appFile))
        .pipe($.uglify())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.js.dest)),
      config.injectOther))
    //AppCSS
    .pipe($.inject(
      gulp.src(config.css.css)
        .pipe($.flatten())
        .pipe($.if(args.prod, $.concat(config.css.appFile)))
        .pipe($.if(args.prod, $.minifyCss()))
        .pipe(gulp.dest(config.css.dest)),
      config.injectOther))
    .pipe(gulp.dest(config.build))
});

//Dist


/*****************************************************************
 *
 * Util
 *
 *****************************************************************/
function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}

function log(msg) {
  if (typeof (msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}
