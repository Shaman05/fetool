/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/4
 * Time: 9:17
 */

define(['util'], function(util){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    util.dialog({
      title: '测试标题',
      content: '测试内容'
    });
    util.dialog({
      content: '测试内容2: 我没有标题哦'
    });
    $scope.$apply();
  }];

});