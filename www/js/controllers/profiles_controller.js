angular.module('uon.controllers')

.controller('ProfilesController', function($scope, $state, teamService, userSession, injectErrors,
                                              playerService, platformService, $ionicNavBarDelegate) {
  $scope.teams = []
  teamService.list().then(function(data){
    $scope.teams = data
  })

  $scope.platforms = []
  platformService.list().then(function(data){
    $scope.platforms = data
  })

  $scope.performingSignUp = !userSession.player

  $scope.goBack = function() {
    if($scope.performingSignUp) {
      $state.go('sign_in')
    } else {
      $state.go('home')
    }
  }

  $scope.player = userSession.player || {}

  var checkNext = function(player) {
    if(!$scope.performingSignUp)
      return $scope.saveDebounced(player, false)

    if(player.team && player.platform && player.nickname) {
      $scope.enableNext = true
    } else {
      $scope.enableNext = false
    }
  }


  $scope.save = function(player, goHome) {
    goHome = typeof goHome != 'undefined' ? goHome : true
    params = {
      nickname: player.nickname,
      team_id: player.team.id,
      platform_id: player.platform.id
    }
    playerService.upsert(params).then(function(data){
      userSession.player = data
      userSession.write()
      if(goHome)
        $state.go('home')
    }, function(res){
      injectErrors($scope, res.data)
    })
  }

  $scope.saveDebounced = ionic.debounce($scope.save, 1000)

  $scope.$watch(function(){
    return JSON.stringify($scope.player)
  }, function(v) {
    checkNext($scope.player)
  })
})
