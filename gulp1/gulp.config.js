module.exports = function() {
  var client = './src/client/';
  var config = {
    tmp: './.tmp',

    /**
     * File Paths
     */
    // all js
    alljs: [
      './src/**/*.js',
      './*.js'
    ],
    css: client + 'styles/styles.css'
  };
  return config;
};