angular.module('uon.controllers')

.controller('ChampionshipsController', function($scope, userSession, championshipService) {
  $scope.championships = []
  championshipService.list().then(function(data){
    $scope.championships = data
  })
})

