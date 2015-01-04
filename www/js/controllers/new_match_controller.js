angular.module('uon.controllers')

.controller('NewMatchController', function($state, $scope, userSession, playerService, matchService){
  $scope.player = userSession.player
  $scope.match = {}
  playerService.list().then(function(data){
    $scope.players = data
  })

  $scope.checkFinish = function(match) {
    $scope.msg = ''
    if(match.scheduled_tmp_date && match.scheduled_time && match.away_player) {
      var datetime = [match.scheduled_tmp_date, match.scheduled_time].join(' ')
      var date = moment(datetime, 'YYYY-MM-DD HH:mm')
      if(date.isAfter(moment())) {
        match.scheduled_date = date.toISOString()
        $scope.enableFinish = true
      } else {
        $scope.msg = 'Data deve ser de hoje em diante'
      }
    }
  }

  $scope.min_date = (new Date).toISOString()
  $scope.min_time = (new Date).toTimeString()

  $scope.finish = function(match) {
    matchService.create({
      match: {
        scheduled_date: match.scheduled_date,
        match_type: 'friendly'
      },
      away_player_id: match.away_player.id,
    }).then(function(data){
      $state.go('show-match', {id: data.id})
    })
  }
})
