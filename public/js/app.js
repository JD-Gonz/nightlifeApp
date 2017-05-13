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
    });
});

