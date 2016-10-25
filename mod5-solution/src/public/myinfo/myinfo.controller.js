(function() {
    "use strict";

    angular.module('public')
        .controller('MyinfoController', MyinfoController);

    MyinfoController.$inject = ['myInfo','MenuService'];

    function MyinfoController(myInfo,MenuService) {
        var $ctrl = this;
        $ctrl.myInfo = myInfo;
        if (myInfo.favoritemenu != undefined) {
                MenuService.getMenuItem(myInfo.favoritemenu.toUpperCase()).then(function(result) {
                $ctrl.menuItem = result.data;
            }).catch(function(error) {
                $ctrl.serverError = true;
                $ctrl.messageServerError = "This menu item doesn't exit anymore !";
            });
        }

    }


})();