/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 10:47
 */

define([], function(){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', '$sce', function($rootScope, $scope, _$services_, $sce){
    $scope.trustUrl = function(){
      document.getElementById('main-frame').contentWindow.location.href = $rootScope.url;
    };
    $scope.refresh = function(){
      document.getElementById('main-frame').contentWindow.location.reload(true);
    };
    $scope.back = function(){
      history.back();
    };
    $scope.$apply();
  }];

});