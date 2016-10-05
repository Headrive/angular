(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })

  // Categories list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/view-categories.template.html',
    controller: 'CategoriesController as catList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('categories.menuitems', {
    url: '/menuitems/{catId}',
    templateUrl: 'src/templates/view-menuitems.template.html',
    controller: 'MenuItemsController as catDetail',
    resolve: {
      menuitems: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.catId);
            }]
    }
  });
};

})();