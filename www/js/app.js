// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('uon', ['ionic', 'uon.controllers', 'uon.services'])

.run(function($ionicLoading, $state, $ionicPlatform, $rootScope, authService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeStart', function (event, next) {
    if (!authService.isSignedIn() && next.data.authRequired) {
      event.preventDefault()
      $state.go('sign_in')
    }
  })

  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({
      content: 'Loading Data',
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 500
    })
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide()
  })
})

.config(function($httpProvider, $stateProvider, $urlRouterProvider){
  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      requestError: function(rejection) {
        $rootScope.$broadcast('loading:hide')
        return $q.reject(rejection)
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      },
      responseError: function(rejection) {
        $rootScope.$broadcast('loading:hide')
        return $q.reject(rejection)
      },
    }
  })

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeController',
      templateUrl: 'templates/home.html',
      data: {
        authRequired: true
      }
    })

    .state('matches', {
      url: '/matches',
      templateUrl: 'templates/matches.html',
      controller: 'MatchesController',
      data: {
        authRequired: true
      }
    })

    .state('sign_in', {
      url: '/sign_in',
      controller: 'SignInController',
      templateUrl: 'templates/sign_in.html',
      data: {
        authRequired: false
      }
    })

    .state('sign_up', {
      url: '/sign_up',
      controller: 'SignUpController',
      templateUrl: 'templates/sign_up.html',
      data: {
        authRequired: false
      }
    })

    .state('profile', {
      url: '/profile',
      controller: 'ProfilesController',
      templateUrl: 'templates/profile.html',
      data: {
        authRequired: true
      }
    })

    .state('new-match', {
      url: '/matches/new',
      controller: 'NewMatchController',
      templateUrl: 'templates/matches/new.html',
      data: {
        authRequired: true
      }
    })

    .state('show-match', {
      url: '/matches/:id',
      controller: 'ShowMatchController',
      templateUrl: 'templates/matches/show.html',
      data: {
        authRequired: true
      }
    })

    .state('championships', {
      url: '/championships',
      controller: 'ChampionshipsController',
      templateUrl: 'templates/championships/index.html',
      data: {
        authRequired: true
      }
    })

    .state('new-championship', {
      url: '/championships/new',
      controller: 'NewChampionshipController',
      templateUrl: 'templates/championships/new.html',
      data: {
        authRequired: true
      }
    })

    .state('config', {
      url: '/config',
      controller: 'ConfigController',
      templateUrl: 'templates/config.html',
      data: {
        authRequired: false
      }
    })

  $urlRouterProvider.otherwise('/home')
})
