(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var listToBuy = this;

  listToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  listToBuy.itemBought = function (itemIndex) {
    ShoppingListCheckOffService.itemBought(itemIndex);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var listBought = this;

  listBought.items = ShoppingListCheckOffService.getItemsBought();
}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of items To Buy
  var itemsToBuy = [
    {name:'Cookies',quantity:10},
    {name:'Sugary Drinks',quantity:5},
    {name:'Milk Packs',quantity:8},
    {name:'Almonds',quantity:7},
    {name:'Coconut',quantity:2},
    {name:'Fruit Packs',quantity:7}
  ];
  // List of items Bought
  var itemsBought = [];

  service.itemBought = function (itemIndex) {
    var item = {
      name: itemsToBuy[itemIndex].name,
      quantity: itemsToBuy[itemIndex].quantity,
    };

    itemsToBuy.splice(itemIndex, 1);
    itemsBought.push(item);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
