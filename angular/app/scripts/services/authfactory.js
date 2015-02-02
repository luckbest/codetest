'use strict';

/**
 * @ngdoc service
 * @name angularApp.authFactory
 * @description
 * # authFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
    .factory('authFactory', ['$http', '$cookieStore', 'API_END',
        function ($http, $cookieStore, API_END) {
            var auth = {};


            auth.login = function (credentials) {

                return $http.post(API_END + 'login', credentials).then(function (response, status) {
                    auth.user = response.data;
                    $cookieStore.put('user', auth.user);
                    return auth.user;
                });
            }

            auth.logut = function () {
                return $http.get(API_END + 'logut').then(function () {
                    auth.user = null;
                    $cookieStore.remove('user');
                });
            }

            return auth;
        }
    ]);
