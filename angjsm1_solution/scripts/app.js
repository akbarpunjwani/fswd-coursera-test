(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkMessage = '';
  $scope.dishes="";
  //
  // $scope.storeDishes = function(){
  //   $scope.dishes=$scope.dishes;
  // };

  $scope.checkDishes = function(){
    var csv = $scope.dishes;
    var msg="";
    var cls="";

    if (csv.length==0){
      msg = 'Please enter data first';
      cls = 'text-danger bg-danger';
    }
    else{
      var dishes = csv.split(",");

      var dishcount=0;
      for (var i=0; i<dishes.length; i++) {
        var dish = dishes[i].trim();

        if (dish.length>0){
          dishcount++;
        }
      }

      if (dishcount<=3) {
        msg="Enjoy!";
        cls = 'text-success bg-success';
      }
      else{
        msg="Too Much!";
        cls = 'text-success bg-success';
      }
    };

    $scope.checkMessage = msg;
    $scope.msgstateclass = cls;
  };
};
}
)();
