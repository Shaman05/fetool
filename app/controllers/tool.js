/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 20:05
 */

define([], function(){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    $scope.toolList = [
      {title: '正则表达式（RegEx）', page: 'regex', desc: '正则表达式匹配、替换，另有多种常用正则表达式提供方便使用。'},
      {title: 'Sass 编译器', page: 'sass', desc: '将 sass 代码编译成 css 代码，编译的实现是调用 sass 模块提供的 sass 命令。'},
      {title: 'Markdown 编译器', page: 'markdown', desc: '将简单、易读易写的文本格式生成结构化的HTML文档。'}
    ];
    $scope.redirect = function(tool){
      window.location.hash = '#/tool/' + tool.page;
    };
    $scope.$apply();
  }];

});