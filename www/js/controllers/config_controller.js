angular.module('uon.controllers')

.controller('ConfigController', function($state, $scope, configService) {
  $scope.config = configService
  $scope.$watch('config.developerMode', function(v){
    configService.developerMode = v
    configService.write()
  })
})
