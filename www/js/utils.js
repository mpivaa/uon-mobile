angular.module('uon.utils', [])

.factory('$localStorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value)
    },
    getObject: function(key, defaultValue) {
      return JSON.parse($window.localStorage[key] || JSON.stringify(defaultValue))
    }
  }
}])

.factory('routeService', function(configService){
  var service = {}
  service.resolveEndpoint = function() {
    if(configService.developerMode) {
      service.endpoint = "http://localhost:3000/api/v1"
    } else {
      service.endpoint = 'https://uonapp.herokuapp.com/api/v1'
    }
  }

  service.build = function(action) {
    service.resolveEndpoint()
    return service.endpoint + action
  }
  return service
})

.factory('configService', function($localStorage){
  service = $localStorage.getObject('configService', { developerMode: false })

  service.write = function() {
    $localStorage.setObject('configService', service)
  }

  return service
})

.factory('injectErrors', function(){
  return function($scope, errors) {
    $scope.errors = {}
    for(var attr in errors) {
      var attrErrors = errors[attr]
      $scope.errors[attr] = attrErrors.join(', ')
    }
  }
})
