'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('DashboardController', ['$scope', 'loanFactory',
        function ($scope, loanFactory) {

            $scope.loan = {
                amount: null
            };

            $scope.create = function () {
                console.log($scope.loan);
                loanFactory.create($scope.loan).then(function(response,status){
                    console.log(response,status);
                });
            };

            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);
