/**
 * @module routes
 * @requires angular
 * @requires app
 * @description
 * routes模块功能:<br>
 * 按照列表routeMap配置应用的路由<br>
 * 注意：模板的基础目录由CONF.tplDir配置
 */

define(['angular', 'app'], function (angular, app) {

  'use strict';

  return app.config(['$routeProvider', function ($routeProvider) {
    //路由列表
    var routeMap = {
      '/': 'welcome',
      '/openUrl': 'rightFrame',
      '/tool': 'tool/index',
      '/error404': 'error/404'
    };
    for(var route in routeMap){
      if(routeMap.hasOwnProperty(route)){
        var tpl = routeMap[route];
        $routeProvider.when(route, {
          templateUrl: 'template/page/' + tpl + '.html',
          reloadOnSearch: false
        }, '');
      }
    }
    $routeProvider
      .when('/comparisonTable/:page', {
        templateUrl: function(params){
          return 'template/page/comparisonTable/' + params.page + '.html';
        },
        reloadOnSearch: false
      }, '')
      .when('/tool/:page', {
        templateUrl: function(params){
          return 'template/page/tool/' + params.page + '.html';
        },
        reloadOnSearch: false
      }, '')
      .otherwise({
        redirectTo: '/error404'
      });
  }]);

});
