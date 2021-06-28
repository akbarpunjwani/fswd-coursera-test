(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/MenuApp/templates/categorieslist.template.html',
  bindings: {
    categoryitems: '<'
  }
});

})();
