(function () {

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['MenuService'];
function MyinfoController(MenuService) {
  var reg = this;

  // console.log(reg);
  reg.user=MenuService.getUserInfo();
  // console.log("MyInfo1",reg.user);

  if(reg.user.email.trim().length === 0){
    reg.user.email='-';
  }

  if(reg.user.phone.trim().length === 0){
    reg.user.phone='-';
  }

  // console.log("MyInfo2",reg.user);

  reg.signupRequired=MenuService.signupRequired;
  // console.log(reg);
};

})();
