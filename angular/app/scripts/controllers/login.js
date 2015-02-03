'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('LoginController', ['$scope', '$state', '$window', 'authFactory', 'growl',
        function ($scope, $state, $window, authFactory, growl) {
            $scope.credentials = {
                email: null,
                password: null
            };

            $scope.login = function () {
                authFactory.login($scope.credentials).then(function (response, status) {
                    console.log('ok action login', response);
                    $state.go('dashboard.create');
                }, function (err) {
                    $scope.invalidLogin = true;
                }).
                finally(function () {
                    console.log('test');
                });
            };

            $scope.logout = function () {
                authFactory.logout().then(function () {
                    $state.go('login');
                }, function (error) {
                    growl.addErrorMessage("Error create loan");
                });
            };
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);
