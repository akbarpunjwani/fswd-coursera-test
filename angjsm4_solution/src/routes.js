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
    templateUrl: 'src/MenuApp/templates/home.template.html'
  })

  // List of Categories
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/MenuApp/templates/categories.template.html',
    controller: 'CategoriesController as categories',
    resolve: {
      categoryitems: ['MenuDataService', function (MenuDataService) {
        // console.log('CategoriesControllerResolve');
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // List of Items
  .state('categories.items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/MenuApp/templates/items.template.html',
    controller: "ItemsController as items"
  });
}

})();
