(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/MenuApp/templates/itemslist.template.html',
  bindings: {
    itemslist: '<'
  }
});

})();
