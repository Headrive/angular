(function() {
    "use strict";

    angular.module('common')
        .service('UserService', UserService);


    //UserService.$inject = ['$http', 'ApiPath'];
    function UserService() {
        var service = this;
        var infos = {};
        
        service.MyInfoIsregitered = function() {
            return (infos != {});
        };
        
        service.getMyInfo = function() {
            return infos;
        };
        
         service.saveMyInfo = function(newInfos) {
            infos = newInfos;
            return infos;
        };
    }

})();