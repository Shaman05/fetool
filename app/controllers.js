/**
 * @module controllers
 * @requires angular
 * @requires services
 * @description
 * controllers模块功能:<br>
 * 定义了主控制器mainController，通过读取controllerTable列表来动态构建对应的子控制器
 */

define(['angular', 'util', 'gui', 'services'], function (angular, util, gui) {

  'use strict';

  var controllers = angular.module('fetool.controllers', ['fetool.services']);
  var controllerTable = {
    'openUrl': 'controllers/openUrl',
    'tool': 'controllers/tool',
    'regex': 'controllers/tool/regex',
    'sass': 'controllers/tool/sass',
    'less': 'controllers/tool/less',
    'markDown': 'controllers/tool/markDown',
    'codeFragment': 'controllers/codeFragment'
  };

  //主控制器
  controllers.controller('MainController', [
    '$rootScope',
    '$scope',
    '_$services_',
    '_$data_source_',
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
  function mainController($rootScope, $scope, _$services_, _$data_source_){
    $rootScope.changeUrl = function(url){
      $rootScope.url = url;
    };
    $rootScope.minWin = gui.minWin;
    $rootScope.closeWin = gui.closeWin;
    $scope.doc = _$data_source_.navDocList;
    $scope.setting = function($event){
      var menu = gui.settingMenu();
      $event.preventDefault();
      menu.popup($event.pageX - 2, $event.pageY - 2);
      return false;
    };
  }

  return controllers;
});
