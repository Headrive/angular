(function() {
  'use strict';

  angular.module('MenuData')
  .controller('MenuItemsController', MenuItemsController);

  MenuItemsController.$inject = ['menuitems'];
  function MenuItemsController(menuitems) {
    this.menuitems = menuitems.data.menu_items.map(function(item) {
      if (!item.small_portion_name) {
        item.small_portion_name = "Small";
      };
      if (!item.large_portion_name) {
        item.large_portion_name = "Large";
      };
      return item;
    });
    this.catname = menuitems.data.category.name;
  };

})();