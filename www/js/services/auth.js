angular.module('uon.services', ['uon.utils'])

.factory('injectAuth', function(userSession){
  return function(params) {
    params = params || {}
    params.token = userSession.authentication_token
    params.email = userSession.email
    return params
  }
})

.factory('authService', function($http, userSession, routeService){
  var service = {}

  service.signIn = function(credentials) {
    return $http
      .post(routeService.build('/sessions'), { user: credentials })
      .then(function(res){
        return userSession.create(res.data)
      })
  }

  service.signUp = function(credentials) {
    return $http
      .post(routeService.build('/registrations'), { user: credentials })
      .then(function(res){
        return userSession.create(res.data)
      })
  }

  service.isSignedIn = function() {
    return !!userSession.authentication_token
  }

  return service
})

.factory('userSession', function ($localStorage) {
  var service = $localStorage.getObject('userSession', {})

  service.create = function(user) {
    for(var i in user) {
      if(!angular.isFunction(service[i])) {
        service[i] = user[i]
      }
    }
    return service.write()
  }

  service.write = function() {
    $localStorage.setObject('userSession', service)
    return service
  }

  service.destroy = function() {
    $localStorage.setObject('userSession', {})
    for(var i in service) {
      if(!angular.isFunction(service[i])) {
        delete service[i]
      }
    }
  }

  return service
})
