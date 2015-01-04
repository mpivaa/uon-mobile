angular.module('uon.controllers')

.controller('MatchesController', function($scope, userSession, matchService) {

  matchService.list().then(function(data) {
    $scope.matches = data
  })

  $scope.accept = function(match) {
    matchService.accept(match)
  }

  $scope.reject = function(match) {
    matchService.reject(match)
  }

  $scope.status = matchService.t_status

  $scope.player = userSession.player
})
