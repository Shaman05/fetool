/**
 * @module filters
 * @requires angular
 * @requires services
 * @description
 * filters模块功能:<br>
 * 自定义应用中的过滤器
 */


define(['angular', 'services'], function (angular, services) {

  'use strict';

  var filters = angular.module('fetool.filters', ['fetool.services']);
  filters.filter('upcase', function(){
    /**
     * @func upcase
     * @param {String} text 需转化的字符串
     * @return {String}
     * @description
     * 将字符串转化成大写
     */
    return function(text){
      return String(typeof(text) === 'string' ? text : '').toUpperCase();
    };
  });
  filters.filter('toMillion', function(){
    /**
     * @func toMillion
     * @param {Number} amount 需转化的金额
     * @return {String}
     * @description
     * 将元转化成万元
     */
    return function(amount){
      return (amount * 1) / (10000 * 100) + '万元';
    };
  });
});
