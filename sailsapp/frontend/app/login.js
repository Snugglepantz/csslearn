(function() {
  angular.module('app')
    .controller('Login', Login);


  Login.$inject = ['$auth'];
  function Login($auth) {
    var vm = this;

    vm.login = function() {
      $auth.authenticate('twitter');
    };
  }
})();