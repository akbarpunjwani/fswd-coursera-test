(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('NarrowItDownAppService', NarrowItDownAppService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemList.html',
    scope: {
      // myTitle: '@title',
      foundItems: '<found',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true,
    link: FoundItemsDirectiveLink
  };

  return ddo;
}


//DIRECTIVE CONTROLLER
function FoundItemsDirectiveController() {
  var list = this;

}



function FoundItemsDirectiveLink(scope, element, attrs, controller) {
  // console.log("Link scope is: ", scope);
  // console.log("Controller instance is: ", controller);
  // console.log("Element is: ", element);

  scope.$watch('list.foundItems.length', function (newValue, oldValue) {
    console.log("Old value: ", oldValue);
    console.log("New value: ", newValue);

    if (newValue === 0) {
      // If nothing is found as a result of the search OR if the user leaves the textbox empty
      displayNothingFoundWarning();
    }
    else {
      removeNothingFoundWarning();
    }

  });

  function displayNothingFoundWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // console.log(warningElem);
    // warningElem.css('display', 'block');

    // If jQuery included before Angluar
    var warningElem = element.find("div.error");
    warningElem.slideDown(900);
  }


  function removeNothingFoundWarning() {
    // Using Angluar jqLite
    // var warningElem = element.find("div");
    // warningElem.css('display', 'none');

    // If jQuery included before Angluar
    var warningElem = element.find("div.error");
    warningElem.slideUp(900);
  }
}

// CONTROLLER
NarrowItDownController.$inject = ['NarrowItDownAppService'];
function NarrowItDownController(NarrowItDownAppService) {
  var list = this;

  list.searchTerm = "";
  list.found = [];  //NarrowItDownAppService.getMatchedMenuItems();

  list.getMatchedMenuItems = function () {
    // console.log("Enter getMatchedMenuItems");

    var promise = NarrowItDownAppService
    .getMatchedMenuItems(list.searchTerm)
    .then(function(response){
      // console.log("After $HTTP");
      // console.log(response.data);
      list.found = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    
    // console.log(promise);

    // console.log("Exit getMatchedMenuItems");
  };

  list.removeItem = function (itemIndex) {    
    NarrowItDownAppService.removeItem(itemIndex);
  };
}


// SERVICE
NarrowItDownAppService.$inject = ['$http', 'ApiBasePath'];
function NarrowItDownAppService($http, ApiBasePath) {
  var service = this;

  var found = [];

  service.getMatchedMenuItems = function (searchTerm) {
    /*
    Method will be responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items. 
    Once it gets all the menu items, it should loop through them to pick out the ones whose description matches the searchTerm. 
    Once a list of found items is compiled, it should return that list (wrapped in a promise). 
    Remember that the then function itself returns a promise.
    */

    //Reaching out to the server (using the $http service) to retrieve the list of all the menu items.
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    //Pick out the ones whose description matches the searchTerm. 
    //Remember that the then function itself returns a promise.
    promise = promise.then(function (response) {     
      // console.log("$HTTP");      
      var menuItems;
      menuItems = response.data; 

      // console.log("Showing data");      
      // console.log(response);      
      // console.log(angular.fromJson(menuItems.menu_items[0]).description);

      found = [];

      //Once it gets all the menu items, it should loop through them
      if(searchTerm.trim().length>0){
        for (var i=0; i<menuItems.menu_items.length; i++){        

          if(angular.fromJson(menuItems.menu_items[i]).description.toLowerCase().indexOf(searchTerm.toLowerCase())>-1){          
            // console.log(i);
            found.push(menuItems.menu_items[i]);
          }
        }      
      }
      console.log(found.length + ' items found. Search Term: ' + searchTerm);

      var response = {status: 200, data: found};

      return response;
    })
    .catch(function (error) {
      console.log(error);
    }) 

    //Once a list of found items is compiled, it should return that list (wrapped in a promise)    
    return promise;
  };

  service.removeItem = function (itemIndex) {
    found.splice(itemIndex, 1);
  };

}

})();
