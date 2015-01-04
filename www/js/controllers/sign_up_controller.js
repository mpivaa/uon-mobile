angular.module('uon.controllers')

.controller('SignUpController', function($state, $scope, authService, injectErrors) {
  $scope.credentials = {
    email: ''
  }
  $scope.errors = {}
  $scope.signUp = function(credentials) {
    authService
      .signUp(credentials)
      .then(function(session) {
        $state.go('profile')
      }, function(res){
        injectErrors($scope, res.data)
      })
  }
})
