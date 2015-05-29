/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([], function(){

  'use strict';

  var sass = require('./node_modules/node-sass');

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    $scope.currentPage = 'sass 编译';

    console.log(sass);

    $scope.$apply();
  }];

});