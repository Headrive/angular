(function () {
'use strict';

angular.module('MenuData')
.component('menuitemsList', {
  templateUrl: 'src/templates/menuitems.template.html',
  bindings: {
    items: '<'
  }
});

})();