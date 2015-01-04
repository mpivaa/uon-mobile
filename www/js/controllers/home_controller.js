angular.module('uon.controllers')

.controller('HomeController', function($scope, $state, userSession, matchService, $interval){
  if(!userSession.player) {
    return $state.go('profile')
  }

  var nextMatchIndex = 1
  $scope.nextMatches = []
  // 1 == scheduled
  matchService.list({ status: 1 }).then(function(data){
    $scope.nextMatches = data.slice(0, 5)
    $scope.nextMatch = $scope.nextMatches[0]
  })

  var nextMatchInterval = $interval(function(){
    if($scope.nextMatches[nextMatchIndex]) {
      $scope.nextMatch = $scope.nextMatches[nextMatchIndex]
      $scope.$apply()
      nextMatchIndex += 1
      if(nextMatchIndex == $scope.nextMatches.length) {
        nextMatchIndex = 0
      }
    }
  }, 6000)

  $scope.$on('$destroy', function() {
    $interval.cancel(nextMatchInterval)
  })
})
