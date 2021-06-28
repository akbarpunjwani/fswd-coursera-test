(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['MenuDataService', 'categoryitems'];
function CategoriesController(MenuDataService, categoryitems) {
  console.log('CategoriesController');  
  var mainList = this;
  mainList.categoryitems = categoryitems;
  console.log(mainList);
}

})();
