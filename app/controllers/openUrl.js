/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 10:47
 */

define([
  'util'
], function(util){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', '$sce', function($rootScope, $scope, _$services_, $sce){
    /*var frame = angular.element(document.querySelector('#main-frame'));
    $scope.trustUrl = function(){
      if($rootScope.url){
        frame[0].contentWindow.location.href = $rootScope.url;
      }
    };
    $scope.refresh = function(){
      frame[0].contentWindow.location.reload(true);
    };*/
    $scope.back = function(){
      history.back();
    };
    var loading = document.getElementById('loading');
    var getPage = xss();
    $scope.$watch(
      function(scope){ return scope.url; },
      function(newUrl, oldUrl){
        loading.style.display = 'block';
        getPage(newUrl);
      }
    );

    function xss(){
      var frame;
      return function(url, callback){
        if(!frame){
          frame = document.createElement('iframe');
          document.getElementById('frameWrap').appendChild(frame);
        }
        frame.className = 'main-frame';
        frame.id = 'main-frame';
        frame.name = 'main-frame';
        frame.height = '100%';
        frame.width = '100%';
        frame.style.border = 'none';
        frame.src = url;
        frame.onload = function(){
          loading.style.display = 'none';
          callback && callback();
        };
      }
    }

    $scope.$apply();

  }];

});