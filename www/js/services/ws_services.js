angular.module('uon.services')

.factory('teamService', function(resourceFactory){
  return resourceFactory('/teams', true)
})

.factory('platformService', function(resourceFactory){
  return resourceFactory('/platforms', true)
})

.factory('championshipService', function(resourceFactory){
  return resourceFactory('/championships', true)
})

.factory('matchService', function(resourceFactory, $http, routeService, injectAuth) {
  var resource = resourceFactory('/matches')

  resource.t_status = function(status) {
    switch(status) {
      case 'waiting': return 'Aguardando aceite';
      case 'scheduled': return 'Agendado';
      case 'finished': return 'Finalizado';
      case 'rejected': return 'Rejeitado';
      case 'contested': return 'Contestado';
    }
  }

  resource.accept = function(match) {
    return $http
      .post(routeService.build('/matches/'+match.id+'/accept'), injectAuth())
      .then(function(res){
        match.status = res.data.status
        return res.data
      })
  }

  resource.reject = function(match) {
    return $http
      .post(routeService.build('/matches/'+match.id+'/reject'), injectAuth())
      .then(function(res){
        match.status = res.data.status
        return res.data
      })
  }

  return resource
})

.factory('playerService', function($http, userSession, routeService, injectAuth, resourceFactory){
  var service = {}
  service.upsert = function(player) {
    return $http
      .put(routeService.build('/player'), injectAuth({ player: player }))
      .then(function(res){
        return res.data
      })
  }

  angular.extend(service, resourceFactory('/players'))

  return service
})
