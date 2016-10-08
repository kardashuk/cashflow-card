'use strict';

/**
 * @ngdoc directive
 * @name cashflowCardApp.directive:money
 * @description
 * # money
 */
angular.module('cashflowCardApp')
.directive('money', function () {
return {
  template: '<span class="money" ng-class="{positive:value>=0,negative:value<0}">{{value}}</span>',
  scope:{
      value: '='
  },
  restrict: 'E'
};
});
