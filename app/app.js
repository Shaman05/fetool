/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/2
 * Time: 15:36
 */

define([
  'angular',
  'filters',
  'services',
  'directives',
  'controllers',
  'angularRoute'
], function (angular, filters, services, directives, controllers) {

  'use strict';

  /** @exports myApp */
  return angular.module('fetool', [
    'ngRoute',
    'fetool.filters',
    'fetool.services',
    'fetool.directives',
    'fetool.controllers'
  ]);
});