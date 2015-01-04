angular.module('uon.controllers')

.controller('SignInController', function($state, $scope, authService, userSession) {
  userSession.destroy()
  $scope.credentials = {}
  $scope.signIn = function(credentials) {
    authService
      .signIn(credentials)
      .then(function(session) {
        $state.go('home')
      }, function(res){
        $scope.msg = res.data.error
      })
  }
})
