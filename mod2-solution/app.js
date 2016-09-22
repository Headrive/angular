(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // LIST #1 - ToBuy controller
    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var toBuyList = this;

        toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

        toBuyList.addItem = function (itemIndex) {
            try {
                ShoppingListCheckOffService.addItemBought(itemIndex);
            } catch (error) {
                toBuyList.errorMessage = error.message;
            }
        }

    }


    // LIST #2 - Bought controller
    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var boughtList = this;

        boughtList.items = ShoppingListCheckOffService.getItemsBought();
        boughtList.emptyMessage = ShoppingListCheckOffService.getEmptyBoughtMessage();
    }

    // Service ShoppingListCheckOffService
    function ShoppingListCheckOffService() {
        var service = this;

        // Lists of shopping items
        var itemsToBuy = [{
            name: "Marshmallow",
            quantity: "100"
            }, {
            name: "Milk",
            quantity: "2"
            }, {
            name: "Donuts",
            quantity: "200"
            }, {
            name: "Cookies",
            quantity: "300"
            }, {
            name: "Chocolate",
            quantity: "5"
            }];
        //var itemsToBuy = itemsInitiallyToBuy.slice(0);
        var itemsBought = [];
        var emptyBoughtMessage =["Nothing bought yet."];
       
       
        // An item has been Bought -> Move the item selected from ToBuy list to Bought List
        service.addItemBought = function (itemToBuyIndex) {

            itemsBought.push(itemsToBuy[itemToBuyIndex]);
            itemsToBuy.splice(itemToBuyIndex, 1);
            if (emptyBoughtMessage[0]!=""){emptyBoughtMessage[0] ="";}
            if (itemsToBuy.length == 0) {
                throw new Error("Everything is bought !");
            };

        };


        // ToBuy List items     
        service.getItemsToBuy = function () {
            return itemsToBuy;
        };


        // Bought List items       
        service.getItemsBought = function () {
            return itemsBought;
        };

        service.getEmptyBoughtMessage = function () {
            return emptyBoughtMessage;
        };


    };



})();