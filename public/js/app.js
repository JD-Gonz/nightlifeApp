/* global $ angular */
'use strict';

const app = angular.module("nightlifeApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        '': { templateUrl: 'views/home.html' },
        'search@home': { templateUrl: 'views/home-search.html' },
        'list@home': { templateUrl: 'views/home-list.html' },
        'footer@home': { templateUrl: 'views/footer.html' }
      }
    })
    .state('home.search', {
      url: 'search',
      template: 'I could sure use a drink right now.'
    })
    .state('home.list', {
      url: 'list',
      templateUrl: 'views/home-list.html',
      controller: function($scope) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
      }
    });
});

const checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  let deferred = $q.defer();

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

