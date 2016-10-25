(function() {
    "use strict";

    angular.module('public')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['UserService', 'MenuService'];

    function SignupController(UserService, MenuService) {
        var $ctrl = this;

        // Submit the form
        $ctrl.submit = function() {
            $ctrl.serverError = false;
            $ctrl.messageServerError = "";
            $ctrl.completed = false;
           
            var newInfo = {
                firstName: '',
                lastName: '',
                email: '',
                tel: [{
                    areaCode: '',
                    number: ''
                }],
                favoritemenu: ''
            };

            // Get Menu item 
            MenuService.getMenuItem($ctrl.favoritemenu.toUpperCase()).then(function(result) {
                $ctrl.menuItem = result.data;
                console.log($ctrl.menuItem);

                // Menu item found
                if ($ctrl.menuItem != undefined) {
                    newInfo.firstName = $ctrl.firstName;
                    newInfo.lastName = $ctrl.lastName;
                    newInfo.email = $ctrl.email;
                    newInfo.tel.areaCode = $ctrl.tel.areaCode;
                    newInfo.tel.number = $ctrl.tel.number;
                    newInfo.favoritemenu = $ctrl.favoritemenu.toUpperCase();
                    UserService.saveMyInfo(newInfo);
                    //console.log(newInfo);
                    $ctrl.completed = true;

                }
            }).catch(function(error) {
                $ctrl.serverError = true;
                $ctrl.messageServerError = "No such menu item exists !";
            });

        }


        // Bonus 3 : check favorite menu item before submitting the entire form
        $ctrl.checkMenuItem = function() {
            $ctrl.serverError = false;
            $ctrl.messageServerError = "";
            $ctrl.menuItemFound = false;

            // Get Menu item 
            MenuService.getMenuItem($ctrl.favoritemenu.toUpperCase()).then(function(result) {
                $ctrl.menuItem = result.data;
                $ctrl.menuItemFound = true;
            }).catch(function(error) {
                console.log("checkMenuItem error");
                $ctrl.serverError = true;
                $ctrl.messageServerError = "No such menu item exists !";
            });

        }
    }
})();