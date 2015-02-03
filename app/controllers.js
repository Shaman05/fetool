/**
 * @module controllers
 * @requires angular
 * @requires services
 * @description
 * controllers模块功能:<br>
 * 定义了主控制器mainController，通过读取controllerTable列表来动态构建对应的子控制器
 */

define(['angular', 'services'], function (angular) {

  'use strict';

  var controllers = angular.module('fetool.controllers', ['fetool.services']);
  var controllerTable = {
    'openUrl': 'controllers/openUrl',
    'tool': 'controllers/tool'
  };

  //主控制器
  controllers.controller('MainController', [
    '$rootScope',
    '$scope',
    'version',
    '_$services_',
    mainController
  ]);
  //其他通用控制器
  for(var c in controllerTable){
    if(controllerTable.hasOwnProperty(c)){
      controllers.controller(c, [
        '$rootScope',
        '$scope',
        '$http',
        '$injector',
        function(c){
          return function($rootScope, $scope, $http, $injector){
            requirejs([controllerTable[c]], function (ctrl) {
              $injector.invoke(ctrl, this, {
                '$rootScope': $rootScope,
                '$scope': $scope
              });
            });
          };
        }(c)]
      );
    }
  }

  /**
   * 主控制器
   * @func mainController
   * @param {Object} $rootScope angular原生对象
   * @param {Object} $scope angular原生对象
   * @param {Object} version services定义的版本号
   * @param {Object} _$services_ services定义的服务对象
   * @description
   * 应用的主控制器可以看做是一个全局的控制器，在所有的路由下都可以使用
   */
  function mainController($rootScope, $scope, version, _$services_){
    $rootScope.appVersion = version;
    $rootScope.userAgent = navigator.userAgent;
    $rootScope.currentPage = null;
    $rootScope.changeUrl = function(url){
      $rootScope.url = url;
    };
    $scope.doc = {
      comparisonTable: {
        label: '常用对照表',
        list: [
          {label: 'HTTP Content-type', page: 'httpContentType'},
          {label: 'HTML转义字符', page: 'htmlESC'},
          {label: 'RGB颜色参考', page: 'colors'},
          {label: 'ASCII对照表', page: 'ASCII'},
          {label: 'HTTP状态码详解', page: 'httpStatusCode'},
          {label: '网页字体参考', page: 'fontFamily'}
        ]
      },
      api: {
        label: 'API 文档',
        frontEnd: {
          label: '前端常用',
          list: [
            {label: 'Css2.0 参考文档', url: 'http://tool.oschina.net/uploads/apidocs/css2/'},
            {label: 'Css3.0 参考文档', url: 'http://tool.oschina.net/uploads/apidocs/css3/'},
            {label: 'JQuery API', url: 'http://tool.oschina.net/uploads/apidocs/jquery/'},
            {label: 'jquery-mobile API', url: 'http://tool.oschina.net/uploads/apidocs/jquery-mobile/'},
            {label: 'Zepto API', url: 'http://www.html-5.cn/Manual/Zepto/'},
            {label: 'extjs API', url: 'http://tool.oschina.net/uploads/apidocs/extjs4.1/docs/index.html#!/api'},
            {label: 'Bootstrap EN', url: 'http://tool.oschina.net/uploads/apidocs/bootstrap/'},
            {label: 'Bootstrap CN', url: 'http://www.bootcss.com/'},
            {label: 'YUI', url: 'http://tool.oschina.net/uploads/apidocs/yui3.5.1/api/'}
          ]
        },
        other:{
          label: '其他',
          list: [
            {label: 'NodeJs API', url: 'http://tool.oschina.net/uploads/apidocs/nodejs/api/'},
            {label: 'Angular 教程', url: 'http://www.w3cschool.cc/angularjs/angularjs-tutorial.html'},
            {label: 'PHP 中文手册', url: 'http://tool.oschina.net/uploads/apidocs/php-zh/'},
            {label: 'MySQL5.1 参考手册', url: 'http://tool.oschina.net/uploads/apidocs/mysql-5.1-zh/'},
            {label: 'Python3', url: 'http://tool.oschina.net/uploads/apidocs/Python/reference/'},
            {label: 'Ruby1.9', url: 'http://tool.oschina.net/uploads/apidocs/ruby-1.9.3-core/'}
          ]
        }
      }
    };
  }

  return controllers;
});
