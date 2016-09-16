(function () {
        'use strict';

        angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController)
        LunchCheckController.$inject = ['$scope'];

        function LunchCheckController($scope) {

            $scope.lunchMenu = '';
            $scope.lunchMenuStatus = '';
            $scope.msgText = '';

            $scope.checkIfTooMuch = function () {

                var lunchMenuItems = $scope.lunchMenu.split(",");
                var nbItems = 0;
                for (var i = 0; i < lunchMenuItems.length; i++) {
                    if (lunchMenuItems[i].trim() != "") {
                        nbItems++;
                    }
                }
                if (nbItems == 0 ) {
                    $scope.msgText = "Please enter data first !";
                    $scope.lunchMenuStatus = "has-error";
                }
                else if (nbItems > 3 ) {
                    $scope.msgText = "Too much !";
                    $scope.lunchMenuStatus = "has-success";
                } else {
                    $scope.msgText = "Enjoy !";
                    $scope.lunchMenuStatus = "has-success";
                }


            };
        }
})();