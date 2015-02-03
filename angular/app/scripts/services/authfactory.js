'use strict';

/**
 * @ngdoc service
 * @name angularApp.authFactory
 * @description
 * # authFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
    .factory('authFactory', ['$http', '$window', '$cookieStore', 'API_END',
        function ($http, $window, $cookieStore, API_END) {
            var auth = {};


            auth.login = function (credentials) {
                return $http.post(API_END + 'login', credentials).then(function (response, status) {
                    $window.sessionStorage.token = response.data.token.api_token;
                    auth.user = response.data.token.api_token;
                    return auth.user;
                });
            }

            auth.logout = function () {
                return $http.get(API_END + 'logout').then(function () {
                    auth.user = null;
                    delete $window.sessionStorage.token;
                    return auth.user;
                });
            }

            return auth;
        }
    ]);
