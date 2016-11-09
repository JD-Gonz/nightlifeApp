/* global $ angular */
'use strict';

var app = angular.module("VotingApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  
  $stateProvider
    .state('home', {
        url:'/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    });
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else {
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
};

