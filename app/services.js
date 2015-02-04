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
