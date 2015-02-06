/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([], function(){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    $scope.currentPage = 'Markdown编译器';
    $scope.$apply();
  }];

});