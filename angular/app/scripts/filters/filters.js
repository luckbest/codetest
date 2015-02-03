'use strict';

/**
 * @ngdoc filter
 * @name angularApp.filter:filters
 * @function
 * @description
 * # return by field all value bigger than  value {field: value}
 * Filter in the angularApp.
 */
angular.module('angularApp')
    .filter('moreThan', function () {
        return function (items, value) {
            var filteredItems = []
            angular.forEach(items, function (item) {
                if (item[Object.keys(value)[0]] > value[Object.keys(value)[0]]) {
                    filteredItems.push(item);
                }
            });
            return filteredItems;
        }
    })
