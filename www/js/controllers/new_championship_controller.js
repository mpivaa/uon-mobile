angular.module('uon.controllers')

.controller('NewChampionshipController', function($scope, championshipService, $state){
  $scope.championship = {}

  $scope.finish = function(championship) {
    championshipService.create({
      championship: championship
    }).then(function(data) {
      $state.go('championships', {id: data.id})
    })
  } 
})
