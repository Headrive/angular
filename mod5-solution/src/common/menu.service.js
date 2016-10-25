(function() {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);


    MenuService.$inject = ['$q', '$http', 'ApiPath'];

    function MenuService($q, $http, ApiPath) {
        var service = this;

        service.getCategories = function() {
            return $http.get(ApiPath + '/categories.json').then(function(response) {
                return response.data;
            });
        };


        service.getMenuItems = function(category) {
            var config = {};
            if (category) {
                config.params = {
                    'category': category
                };
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
                return response.data;
            });
        };



        /* //*** Get menu Item / My favorite     
        service.getMenuItem = function(shortname) {
            var config = {};
            if (shortname) {
                config.params = {
                    'short_name': shortname
                };
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function(response) {
                    console.log(response.data);
                    return response.data;
                })
                .catch(function(error) {
                    console.log("The item name specified is not valid.");
                });

        };
*/

        //*** Get menu Item / My favorite     
        service.getMenuItem = function(shortname) {
            var config = {};
            if (shortname) {
                return $http.get(ApiPath + '/menu_items/' + shortname + '.json').then(function(response) {
                    console.log(response.data);
                    return response; // Resolve
                }).catch(
                    function(response) {
                        console.log("No such menu item exists !");
                        return $q.reject(response); // Reject
                    });
            }
        }

    };

})();