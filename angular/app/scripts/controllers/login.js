'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('LoginController', ['$scope', 'authFactory', '$state',
        function ($scope, authFactory, $state) {
            $scope.credentials = {
                email: null,
                password: null
            };

            $scope.login = function () {
                authFactory.login($scope.credentials).then(function () {
                    $state.go('dashboard.create');
                }, function () {
                    $scope.invalidLogin = true;
                }).
                finally(function () {
                    console.log('test');
                });
            };

            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);
