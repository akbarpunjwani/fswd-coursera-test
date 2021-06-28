(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', '$stateParams', 'categoryitems'];
function ItemsController(MenuDataService, $stateParams, categoryitems) {
  console.log('ItemsController');
  console.log(categoryitems.data);
  console.log($stateParams.categoryId);

  var mainList = this;
  var category = categoryitems.data[$stateParams.categoryId];
  console.log(category);

  mainList.category = category;
  mainList.categories = categoryitems;
  MenuDataService.getItemsForCategory(category.short_name)
    .then(function(itemsForCategory){
            mainList.categoryItems = itemsForCategory;
            return itemsForCategory;
          });

  console.log(mainList);
}

})();
