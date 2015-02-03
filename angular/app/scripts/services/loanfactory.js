'use strict';

/**
 * @ngdoc service
 * @name angularApp.loanFactory
 * @description
 * # loanFactory
 * Factory in the angularApp.
 */
angular.module('angularApp')
    .factory('Loan', ['$http', 'API_END', '$resource',
        function ($http, API_END, $resource) {
            return $resource(API_END + 'loan/:id', null, {
                'update': {
                    method: 'PUT'
                }
            });
        }
    ]);
