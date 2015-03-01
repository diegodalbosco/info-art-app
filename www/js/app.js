// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])

.run(function($ionicPlatform, $localstorage, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if ($localstorage.get('job') && $localstorage.get('name')) {
      $state.href('/home');
    } else {
      $state.href('/first');
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeCtrl',
      templateUrl: 'home/home.html'
    })    
    .state('first', {
      url: '/first',
      controller: 'FirstCtrl',
      templateUrl: 'first/first.html'
    })

  $urlRouterProvider.otherwise('/first');
})

.controller('FirstCtrl', function($scope, $localstorage, $state) {
  var init = function(){
      if($scope.getName() && $scope.getJob()){
          $state.href('/home');
      }
  };
  $scope.setName = function(name) {
    if (name) {
      $localstorage.set('name', name.toLowerCase());
      console.log(name);
    }
  }
  $scope.setJob = function(job) {
    if (name) {
      $localstorage.set('job', job.toLowerCase());
      console.log(job);
    }
  }
  $scope.saveAll = function(name, job) {
    if (name) {
      $localstorage.set('name', name.toLowerCase());
      console.log(name);
    }
    if (job) {
      $localstorage.set('job', job.toLowerCase());
      console.log(job);
    }
    init();
  }
  $scope.getName = function() {
    return $localstorage.get('name');
  };

  $scope.getJob = function() {
      return $localstorage.get('job');
  };

  init();

})


.controller('HomeCtrl', function($scope) {
  $scope.lol = function() {
    alert("im here");
  }
  lol();
})

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);