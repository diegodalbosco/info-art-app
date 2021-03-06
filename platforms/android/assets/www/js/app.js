// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
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
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      controller: 'HomeCtrl',
      templateUrl: 'templates/home.html'
    })
    .state('first', {
      url: '/first',
      controller: 'FirstCtrl',
      templateUrl: 'templates/first-time.html'
    })
    .state('settings', {
      url: '/settings',
      controller: 'SettingsCtrl',
      templateUrl: 'templates/settings.html'
    });

    $urlRouterProvider.otherwise('/first');

})

.controller('FirstCtrl', function($scope, $localstorage, $state) {

  var init = function(){
      if($scope.getName() && $scope.getJob()){
          $state.go('home');
      }
  };

  $scope.setName = function(name) {
    if (name) {
      $localstorage.set('name', name.toLowerCase());
      console.log(name);
    }
  };

  $scope.setJob = function(job) {
    if (job) {
      $localstorage.set('job', job.toLowerCase());
      console.log(job);
    }
  };

  $scope.saveAll = function(name, job) {
    $scope.setName(name);
    $scope.setJob(job);
    init();
  };

  $scope.getName = function() {
    return $localstorage.get('name');
  };

  $scope.getJob = function() {
    return $localstorage.get('job');
  };

  init();

})


.controller('HomeCtrl', function($scope, $localstorage, $state) {
  $scope.job = $localstorage.get('job');
  $scope.name = $localstorage.get('name');
})

.controller('SettingsCtrl', function($scope, $localstorage, $state) {
  $scope.job = $localstorage.get('job');
  $scope.name = $localstorage.get('name');

  $scope.deleteData = function() {
    $localstorage.del('name');
    $localstorage.del('job');
    $state.go('first');
  }

  $scope.changeData = function(name, job) {
    console.log(name);
    console.log(job);
    if (name) {
      $localstorage.set('name', name);
      $state.go('home');
    }
    if (job){
      $localstorage.set('job', job);
      $state.go('home');
    }
  }

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
    },
    del: function(key) {
      $window.localStorage.removeItem(key);
    }
  };
}]);