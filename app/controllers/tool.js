/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 20:05
 */

define([], function(){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', '_$data_source_', function($rootScope, $scope, _$services_, _$data_source_){
    $scope.toolList = _$data_source_.toolPages;
    $scope.redirect = function(tool){
      window.location.hash = '#/tool/' + tool.page;
    };
    $scope.$apply();
  }];

});