(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userinfo = {firstname:"XXXX",
                  lastname:"YYYX",
                  email:"xxx@yyy.com",
                  phone:"",
                  itemshortname:"L15",
                  itemdetails:null
                };

  service.signupRequired = true;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (shortname) {
    var config = {};
    if (shortname) {
      config.params = {'shortname': shortname};
    }

    return $http.get(ApiPath + '/menu_items/'+shortname+'.json', config).then(function (response) {
      return response.data;
    });
  };

  service.registerUser = function (userdetails){
    // console.log(userinfo);
    // console.log(userdetails);

    userinfo.firstname=userdetails.firstname;
    userinfo.lastname=userdetails.lastname;
    userinfo.email=userdetails.email;
    userinfo.phone=userdetails.phone;
    userinfo.itemshortname=userdetails.itemshortname;
    userinfo.itemdetails=userdetails.itemdetails;

    service.userinfo=userinfo;
    service.signupRequired = false;
  };

  service.getUserInfo = function(){
    if(userinfo.email === '-'){
      userinfo.email='';
    }

    if(userinfo.phone === '-'){
      userinfo.phone='';
    }

    return userinfo;
  };
};



})();
