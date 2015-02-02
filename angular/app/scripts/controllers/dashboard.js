'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
  .controller('DashboardController', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
