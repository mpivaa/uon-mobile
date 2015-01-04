angular.module('uon.controllers', ['uon.services', 'uon.utils'])
/*
.controller('MatchesCtrl', function($scope, UserSession, $http, $state, Route, injectAuth,
                                    MatchesService, PlayerService, $ionicNavBarDelegate) {
  MatchesService.index().then(function(data) {
    $scope.matches = data
  })

  $scope.player = UserSession.player

  $scope.next = function(player) {
    $scope.away_player = player
    angular.element(document.getElementsByClassName('scheduled_date'))
      .attr('min', (new Date).toISOString())
      .val((new Date).toISOString())
    $scope.nextStep = true
  }

  $scope.goBack = function() {
    if($scope.nextStep) {
      $scope.nextStep = false
    } else {
      $ionicNavBarDelegate.back()
    }
  }

  $scope.checkFinish = function(scheduled_date) {
    if(scheduled_date) {
      date = new Date(scheduled_date)
      if((2*3600 + date.getTime()) > Date.now()) {
        $scope.enableFinish = true
        $scope.scheduled_date = scheduled_date
      }
    }
  }

  $scope.accept = function(match) {
    $http
      .post(Route.defer('/matches/'+match.id+'/accept'), injectAuth())
      .then(function(res){
        match.status = res.data.status
      })
  }

  $scope.reject = function(match) {}

  $scope.status = function(status) {
    switch(status) {
      case 'waiting': return 'Aguardando aceite';
      case 'scheduled': return 'Agendado';
      case 'finished': return 'Finalizado';
      case 'contested': return 'Contestado';
    }
  }

  $scope.finish = function() {
    MatchesService.create({
      match: {
        scheduled_date: $scope.scheduled_date,
        match_type: 'friendly'
      },
      away_player_id: $scope.away_player.id,
    }).then(function(data){
      $state.go('matches', {id: date.id})
    })
  }

  PlayerService.index().then(function(data){
    $scope.players = data
  })
})

.controller('MatchResultCtrl', function(MatchesService, $scope, $state, $http, Route, injectAuth){
  MatchesService.get($state.params.id).then(function(data){
    $scope.match = data
  })

  $scope.result = {}

  $scope.sendResult = function(result){
    $http
      .post(Route.defer('/matches/'+$scope.match.id+'/result'), injectAuth({result: result}))
      .then(function(res){
        $state.go('matches')
      })
  }
})

*/
