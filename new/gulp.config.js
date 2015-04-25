module.exports = function () {
  var build = 'dist/';
  var vendorSrc = 'bower/lib/';
  var vendorCSSDest = build + 'vendorCSS/';
  var vendorJSDest = build + 'vendorJS/';
  var config = {
    build: build,
    tmp: './.tmp/',
    index: 'src/index.html',
    html: [
      '!src/index.html',
      'src/**/*.html'
    ],
    js: {
      src: [
        './src/**/*.module.js',
        './src/**/*.js',
        './.tmp/**/*.js'
      ],
      dest: build,
      vendorSrc: [
        vendorSrc + '**/jquery/**/*.js',
        vendorSrc + '**/angular/**/*.js',
        vendorSrc + '**/*.js',
      ],
      vendorDest: vendorJSDest,
      vendorFile: 'vendor.min.js',
      appFile: 'app.min.js'
    },
    css: {
      less: 'src/less/**/*.less',
      css: [
        'src/content/**/*.css',
        '.tmp/**/*.css'
      ],
      dest: build + 'css/',
      vendorSrc: [
        vendorSrc + '**/*.css'
      ],
      vendorDest: vendorCSSDest,
      vendorFile: 'vendor.min.css',
      appFile: 'app.min.css'
    },
    fonts: {
      src: [
        'bower_components/font-awesome/fonts/*.*',
        'src/content/fonts/**/*.*'
      ],
      dest: build + 'fonts'
    },
    images: {
      src: 'src/content/images/**.*',
      dest: build + 'content/images/'
    },
    flash: {
      src: vendorSrc + '**/*.swf',
      dest: vendorJSDest
    },
    injectOther: {
      ignorePath: build,
      addRootSlash: false
    },
    injectBower: {
      name: "bower",
      ignorePath: build,
      addRootSlash: false
    }

  };

  return config;
};