'use strict';

/**
 * @ngdoc function
 * @name angularApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the angularApp
 */
angular.module('angularApp')
    .controller('DashboardListController', ['$scope', 'Loan', 'growl',
        function ($scope, Loan, growl) {
            $scope.loans = [];

            var entries = Loan.query(function (err) {
                $scope.loans = entries;
            }, function (err) {
                console.log('err', err);
            });

            $scope.remove = function (id) {
                Loan.delete({
                    id: id
                }, function () {
                    $scope.loans = Loan.query();
                }, function () {
                    growl.addErrorMessage("Error");
                });

            }

        }
    ]).controller('DashboardCreateController', ['$scope', 'Loan', '$state', 'growl',
        function ($scope, Loan, $state, growl) {
            $scope.amount = null;
            $scope.loan = new Loan();

            $scope.create = function () {
                $scope.loan.amount = $scope.amount;
                Loan.save($scope.loan, function () {
                    growl.addSuccessMessage("Added new loan");
                    $state.go('dashboard.list');
                }, function (err) {
                    growl.addErrorMessage("Error create loan");
                });
            };
        }
    ]).controller('DashboardDetailController', ['$scope', 'Loan', 'growl', '$stateParams',
        function ($scope, Loan, growl, $stateParams) {
            $scope.loan = null;

            var loan = Loan.get({
                id: $stateParams.id
            }, function () {
                $scope.loan = loan;
            });
            $scope.edit = function () {
                loan.$update($scope.loan).then(function (response) {
                        growl.addSuccessMessage("Updated loan");
                    },
                    function (err) {
                        growl.addErrorMessage("Error update loan");
                    });
            };
        }
    ]).controller('DashboardDeleteController', ['$scope', 'Loan',
        function ($scope, Loan) {

        }
    ]);
