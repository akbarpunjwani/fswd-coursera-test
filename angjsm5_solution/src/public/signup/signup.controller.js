(function () {

angular.module('public')
.controller('SignupController', SignupController)
.directive('checkmenuitemexists',checkMenuItemExists);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var reg = this;

  reg.user=MenuService.getUserInfo();

  reg.submit = function () {
    reg.completed = false;

    MenuService.getMenuItem(reg.user.itemshortname).then(
      function(response){        
        reg.user.itemdetails = response;

        MenuService.registerUser(reg.user);
        
        reg.completed = true;
        
        // return response;
      },
      function(error){
        reg.completed = false
      }
    );

    // console.log(reg);
  };
}


checkMenuItemExists.$inject = ['$http', '$q', '$timeout', 'ApiPath']
function checkMenuItemExists($http, $q, $timeout, ApiPath) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      // fetch the call address from directives 'checkIfAvailable' attribute
      //var serverAddr = attr.checkMenuItemExists;
      ngModel.$asyncValidators.invalidMenuItem = function(modelValue, viewValue) {
        // console.log("Enter IMI");

        var itemshortname = viewValue;
        var deferred = $q.defer();
        // ask the server if this itemshortname exists
        $http.get(ApiPath + '/menu_items/'+itemshortname+'.json').then(
          function(response) {
            // console.log(response);
            // console.log("MV:",modelValue);

            // simulate a server response delay of half a second
            $timeout(function() {
              if (response.data.exists) {
                deferred.reject();
              } else {
                deferred.resolve();
              }
            }, 500);
          }
          ,function(response) {
            // console.log(response);
            // console.log("MV:",modelValue);
            // console.log("VV:",viewValue);
            deferred.reject();
          }
          );
        // console.log("Return IMI", deferred.promise);
        // return the promise of the asynchronous validator
        return deferred.promise;
      }
      // console.log(ngModel.$asyncValidators);
    }
  }
}



// checkMenuItemExists.$inject = ['$http'];
// function checkMenuItemExists($http){
//     return {
//      restrict: 'A',
//      require: 'ngModel',
//      link: function (scope, element, attr, ngModel) {
//         // validation callback registration to ngModel
//         // fetch the call address from directives 'checkIfAvailable' attribute
//         var serverAddr = attr.checkMenuItemExists;
//         ngModel.$asyncValidators.invalidMenuItem = function(modelValue, viewValue) {
//           // validation logic here
//           itemshortname=viewValue;

//         }
//       }
//     }
//     MenuService.getMenuItem(reg.user.itemshortname).then(
//       function(response){
//         reg.user.itemdetails = response;
//         reg.completed = true;
//       },
//       function(error){
//         reg.completed = false
//       }
//     );

//     return reg.completed;
//   };

})();
