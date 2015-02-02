'use strict';

/**
 * @ngdoc service
 * @name angularApp.loanFactory
 * @description
 * # loanFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
    .factory('loanFactory', ['$http','API_END',
        function ($http,API_END) {
            // Service logic
            // ...

            var loan = {};

            loan.create = function (data) {
                console.log('send',data);
                return $http.post (API_END + 'loan', data).then(function(response){
                    return response.data;
                });
            };


            // Public API here
            return loan;
        }
    ]);
