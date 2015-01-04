angular.module('uon.services')

.factory('resourceFactory', function($http, routeService, injectAuth, $q, $cacheFactory){
  $cacheFactory('resourceCache')
  return function(resourceRoute, globalCache) {
    var service = {}
    var resourceCache = $cacheFactory.get('resourceCache')

    service.list = function(params, cache) {
      cache = cache || globalCache || false
      params = injectAuth(params)
      var route = routeService.build(resourceRoute)
      var cacheKey = route+JSON.stringify(params)
      var cachedData = resourceCache.get(cacheKey)
      var deferred = $q.defer()

      if(cache && cachedData) {
        deferred.resolve(cachedData)
      } else {
        $http
          .get(route, { params: params })
          .then(function(res){
            resourceCache.put(cacheKey, res.data)
            deferred.resolve(res.data)
          }, function(error) {
            deferred.reject(error)
          })
      }
      return deferred.promise
    }

    service.get = function(id, params, cache) {
      cache = cache || globalCache || false
      params = injectAuth(params)
      var route = [routeService.build(resourceRoute), id].join('/')
      var cacheKey = route+JSON.stringify(params)
      var cachedData = resourceCache.get(cacheKey)
      var deferred = $q.defer()

      if (cache && cachedData) {
        deferred.resolve(cachedData)
      } else {
        $http
          .get(route, { params: params })
          .then(function(res) {
            resourceCache.put(cacheKey, res.data)
            deferred.resolve(res.data)
          }, function(error) {
            deferred.reject(error)
          })
      }
      return deferred.promise
    }

    service.create = function(params) {
      return $http
        .post(routeService.build(resourceRoute), injectAuth(params))
        .then(function(res) {
          return res.data
        })
    }
    return service
  }
})
