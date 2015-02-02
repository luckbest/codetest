'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
    .module('angularApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .constant('API_END', 'http://localhost:8000/api/')
    .config(function ($stateProvider,$httpProvider) {
        $httpProvider.defaults.withCredentials = true;
        // $urlRouterProvider.otherwise("/login");
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                controller: 'DashboardController',
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
                url: '/list',
                controller: 'DashboardController',
                templateUrl: 'views/dashboard/list.html'
            })
            .state('dashboard.create', {
                url: '/create',
                controller: 'DashboardController',
                templateUrl: 'views/dashboard/create.html'
            })
            .state('login', {
                url: '/login',
                controller: 'LoginController',
                resolve: {
                    user: ['authFactory', '$q',
                        function (authFactory, $q) {
                            console.log('login', authFactory);
                            if (authFactory.user) {
                                return $q.reject({
                                    authorized: true
                                });
                            }
                        }
                    ]
                },
                templateUrl: 'views/login.html'
            });
    }).run(['$rootScope', '$state', '$cookieStore', 'authFactory',
        function ($rootScope, $state, $cookieStore, authFactory) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                console.log('error', error);
                if (error.unAuthorized) {
                    $state.go('login');
                } else if (error.authorized) {
                    $state.go('dashboard.list');
                }
            });
            authFactory.user = $cookieStore.get('user');
        }
    ]);
