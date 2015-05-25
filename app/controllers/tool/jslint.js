/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([], function(){

  'use strict';

  var LintStream = require('./node_modules/jshint');

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    console.log(LintStream);
    $scope.currentPage = 'JSLint 语法检测';
    $scope.$apply();
  }];

});