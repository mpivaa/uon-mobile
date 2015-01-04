angular.module('uon.controllers')

.controller('ShowMatchController', function(matchService, routeService, $state, $scope, $http, injectAuth, userSession){
  var player = userSession.player
  $scope.match = {}
  $scope.result = {}
  
  matchService.get($state.params.id).then(function(data){
    $scope.match = match = data
    $scope.result[match.away.id] = match.away.score,
    $scope.result[match.home.id] = match.home.score
  })

  
  $scope.status = matchService.t_status

  $scope.sendResult = function(result){
    $http
      .post(routeService.build('/matches/'+$scope.match.id+'/result'), injectAuth({result: result}))
      .then(function(res){
        $scope.match = res.data
      })
  }

  $scope.canSendResult = function(match) {
    if(match.status)
      return match.status == 'scheduled' && match.home.id == player.id
  }
})