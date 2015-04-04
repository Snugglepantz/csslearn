var stage = 'build/';
var release = 'dist/';
var vendorSrc = 'bower/lib/';
var vendorDest = 'lib/';

module.exports = {
  html: {
    index: 'src/index.html',
    src: ['src/**/*.html', '!stc/index.html']
  },
  js: {
    src: ['src/**/*module.js', 'src/**/*.js'],
    inject: "app/**/*.js",
    dest: "",
    vendorSrc: [vendorSrc + "**/jquery/*.js", vendorSrc + '**/*.js'],
    vendorDest: vendorDest + 'js/',
    vendorInject: vendorDest + "js/*.js"
  },
  css: {
    src: ['src/content/css/**/*.css'],
    inject: 'css/**/*.css',
    dest: 'css/',
    vendorSrc: vendorSrc + "**/*.css",
    vendorDest: vendorDest + "css/",
    vendorInject: vendorDest + "css/*.css"
  },
  sass: {
    src: "src/content/sass/**/*.{scss, sass}",
    dest: "css/"
  },
  fonts: {
    src: vendorSrc + "**/fonts/*.*",
    dest: vendorDest + "fonts/"
  },
  stage: stage,
  release: release
};