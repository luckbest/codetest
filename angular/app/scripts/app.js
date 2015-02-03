'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */

var interceptor = function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = $window.sessionStorage.token;
            }
            return config;
        },
        response: function (response) {
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        }
    };
};


angular
    .module('angularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'angular-growl'
    ])
    .constant('API_END', 'http://localhost:8000/api/')
/**
 * Growl configuration
 */
.config(['growlProvider',
    function ($growlProvider) {
        $growlProvider.globalTimeToLive(3000);
        $growlProvider.onlyUniqueMessages(false);
    }
]).config(['$stateProvider', '$httpProvider', '$urlRouterProvider',
    function ($stateProvider, $httpProvider, $urlRouterProvider) {
        $urlRouterProvider.when('', '/dashboard');
        $urlRouterProvider.otherwise('/notfound');
        $httpProvider.interceptors.push(interceptor);
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard.html',
                resolve: {
                    user: ['authFactory', '$q',
                        function (authFactory, $q) {
                            return authFactory.user || $q.reject({
                                unAuthorized: true
                            });
                        }
                    ]
                }
            })
            .state('dashboard.list', {
                url: '/loan',
                controller: 'DashboardListController',
                templateUrl: 'views/dashboard/list.html'
            })
            .state('dashboard.create', {
                url: '/loan/create',
                controller: 'DashboardCreateController',
                templateUrl: 'views/dashboard/create.html'
            })
            .state('dashboard.edit', {
                url: '/loan/detail/:id',
                controller: 'DashboardDetailController',
                templateUrl: 'views/dashboard/detail.html'
            })
            .state('dashboard.delete', {
                url: '/loan/delete/:id',
                controller: 'DashboardDeleteController',
                templateUrl: 'views/dashboard/delete.html'
            })
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                resolve: {
                    user: ['authFactory', '$q',
                        function (authFactory, $q) {
                            if (authFactory.user) {
                                return $q.reject({
                                    authorized: true
                                });
                            }
                        }
                    ]
                },
                templateUrl: 'views/login.html'
            })
            .state('logout', {
                url: '/logout',
                controller: 'LoginController',
            })
    }
]).run(['$rootScope', '$state', '$cookieStore', 'authFactory', '$window',
    function ($rootScope, $state, $cookieStore, authFactory, $window) {



        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log('error', error);
            if (error.unAuthorized) {
                $state.go('login');
            } else if (error.authorized) {
                $state.go('dashboard.list');
            }
        });
        authFactory.user = $window.sessionStorage.token;
    }
]);
