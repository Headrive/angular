(function() {
    'use strict';
    angular.module('NarrowItDown', [])

    .controller('NarrowItDownController', NarrowItDownController)
        //.controller('FoundItemsDirectiveController', FoundItemsDirectiveController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('APIBasePath', "https://davids-restaurant.herokuapp.com");


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                title: '@',
                onRemove: '&',
                search: '<'
            },
            controller: NarrowItDownController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }


    //*************************************************************
    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = '';

        menu.narrow = function(searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm)
            promise.then(function(result) {
                    menu.found = result;
                    menu.title = (menu.found.length + " item(s) found");
                    menu.filter = searchTerm;
                })
                .catch(function(error) {
                    console.log("NarrowItDownController click: " + error);
                });
        };

        menu.removeItem = function(itemIndex) {
            menu.found.splice(itemIndex, 1);
            console.log("item removed");
            menu.title = (menu.found.length + " item(s) found");
            console.log(menu.title);
        };
    }

    //*************************************************************
    MenuSearchService.$inject = ['$http', 'APIBasePath'];

    function MenuSearchService($http, APIBasePath) {
        var service = this;

        service.getMatchedMenuItems = function(searchTerm) {
            return $http({
                    method: "GET",
                    url: (APIBasePath + "/menu_items.json")
                })
                .then(function(result) {
                    // process the result and only keep items that match
                    var allItems = result.data.menu_items;
                    var foundItems = [];
                    if (searchTerm.length == 0) {
                        allItems = [];
                    } else {
                        for (var i = 0; i < allItems.length; i++) {
                            var descItem = allItems[i].description;
                            if (descItem.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                                foundItems.push(allItems[i]);
                            }
                        }
                    }
                    // return processed items
                    return foundItems;
                })
                .catch(function(error) {
                    console.log("MenuSearchService: " + error);
                });


        };
    }


})();