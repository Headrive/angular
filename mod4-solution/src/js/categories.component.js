(function () {
'use strict';

angular.module('MenuData')
.component('categoriesList', {
  templateUrl: 'src/templates/categories.template.html',
  bindings: {
    items: '<'
  },
  controller: CategoriesComponentController
});

CategoriesComponentController.$inject = ['$rootScope'];
function CategoriesComponentController($rootScope) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      console.log('categories state change started');
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      console.log("categories state changed successful");
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error){
      console.log("categories state transition error: ", error);
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };
};

})();
