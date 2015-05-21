/**
 * @module services
 * @requires angular
 * @description
 * services模块功能:<br>
 * 1. 创建了应用的_$services_对象：该对象根据apiMap表定义了应用中的api接口<br>
 * 2. 可创建应用中全局model<br>
 * 注意：如果使用appMock拦截应用的请求来模拟数据，那么blockMap的每个拦截(key)需要在apiMap中有对应的值(value)
 */

define(['angular'], function (angular) {

  'use strict';

  var pkg = require('../package.json');
  var services = angular.module('fetool.services', []);
  services.value('version', pkg.version);
  services.factory('_$data_source_', function(){
    return {
      navDocList: {
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
              {label: 'angularJs(en)', url: 'http://docs.angularjs.cn/api/'},
              {label: 'ionic(en)', url: 'http://ionicframework.com/docs/'},
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
      }
    }
  });
  services.factory('_$services_', function($http, $rootScope){
    var o = {};
    var key;
    //api接口列表
    var apiMap = {
      prjList: 'projectList',
      userInfo: 'userInfo'
    };
    for(key in apiMap){
      if(apiMap.hasOwnProperty(key)){
        (function(query, key){
          o[key] = function(params, success, error){
            var _params = params;
            var _success = success || function(){};
            if(typeof(_params) === 'function'){
              _success = _params;
            }
            if(typeof(_params) !== 'object'){
              _params = {};
            }
            $rootScope.isLoading = true;
            query({
              params: _params,
              url: apiMap[key]
            }).success(function(data){
              $rootScope.isLoading = false;
              if(_success){
                _success(data);
              }
            }).error(function(err){
              if(error){
                error(err);
              }
            });
          };
        })($http, key);
      }
    }
    return o;
  });

});
