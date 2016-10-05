(function() {
    'use strict';

    angular.module('MenuData')
        .service('MenuDataService', MenuDataService)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'APIBasePath'];

    function MenuDataService($http, APIBasePath) {
        var service = this;
        service.getAllCategories = function() {
            return $http.get(APIBasePath + "/categories.json").then(function(result) {
                    // return processed items
                    console.log(result);
                    return result;
                })
                .catch(function(error) {
                    console.log("MenuDataService - getAllCategories : " + error);
                });
        };

            service.getItemsForCategory = function(shortCategoryName) {
                return $http.get(APIBasePath + "/menu_items.json", {
                        params: {
                            category: shortCategoryName
                        }
                    }).then(function(result) {
                        // return processed items
                        return result;
                    })
                    .catch(function(error) {
                        console.log("MenuDataService - getItemsForCategory : " + error);
                    });

        };
    }
})();