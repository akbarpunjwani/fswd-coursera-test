(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$q', '$timeout', '$http', 'ApiBasePath']
function MenuDataService($q, $timeout, $http, ApiBasePath) {
  var service = this;

  // List of shopping items
  var items = [];

  // Pre-populate a no cookie list
  items.push({
    name: "Sugar",
    quantity: "2 bags",
    description: "Sugar used for baking delicious umm... baked goods."
  });
  items.push({
    name: "flour",
    quantity: "1 bags",
    description: "High quality wheat flour. Mix it with water, sugar, 2 raw eggs."
  });
  items.push({
    name: "Chocolate Chips",
    quantity: "3 bags",
    description: "Put these in the dough. No reason, really. Gotta store them somewhere!"
  });

  // Simulates call to server
  // Returns a promise which is a result of using the $http service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
  service.getAllCategories = function () {
    // var deferred = $q.defer();

    // // Wait 2 seconds before returning
    // $timeout(function () {
    //   // deferred.reject(items);
    //   deferred.resolve(items);
    // }, 800);

    // return deferred.promise;

    console.log('getAllCategories');

    //Reaching out to the server (using the $http service) to retrieve the list of all the menu items.
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    console.log(promise);
    //Once a list of found items is compiled, it should return that list (wrapped in a promise)    
    return promise;
  };

  //Returns a promise which is a result of using the $http service, using the following 
  //REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=, where, 
  //Before the call to the server, your code should append whatever categoryShortName value was passed in as an argument into the getItemsForCategory method.
  service.getItemsForCategory = function (categoryShortName) {
    console.log('getAllCategories');
    console.log(ApiBasePath + "/menu_items.json?category=" + categoryShortName);

    //Reaching out to the server (using the $http service) to retrieve the list of all the menu items.
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
    });

    console.log(promise);    
    //Once a list of found items is compiled, it should return that list (wrapped in a promise)    
    return promise;
  }
}

})();
