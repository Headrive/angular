(function() { 
'use strict';

  angular.module('MenuData')
  .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['items'];
  function CategoriesController(items) {
      console.log("CategoriesController :" +items.data);
    this.items = items.data;
  };
  
})();