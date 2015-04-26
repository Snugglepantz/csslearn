/**
 * Created by jphoff on 4/25/2015.
 */
(function() {
  angular.module('app', [
    'satellizer'
  ])
    .config(config);
  config.$inject = ['$authProvider'];
  function config($authProvider) {
    $authProvider.twitter({
      url: '/api/user/login'
    })
  }

})();