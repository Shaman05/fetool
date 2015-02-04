/**
 * @module directives
 * @requires angular
 * @requires services
 * @description
 * directives模块功能:<br>
 * 自定义应用中的指令
 */

define(['angular', 'services'], function (angular, services) {

  'use strict';

  var directives = angular.module('fetool.directives', ['fetool.services']);

  //svg icons
  angular.forEach([
    'fragment', 'document', 'plug', 'tool', 'book', 'back', 'refresh', 'setting', 'topset', 'logout'
  ], function(name){
    var directiveName = 'icon' + name.charAt(0).toUpperCase() + name.slice(1);
    directives.directive(directiveName, [
      function(){
        return {
          restrict: 'E',
          replace: true,
          templateUrl: 'template/icons/' + name + '.svg',
          link: function(scope, elem, attrs){
            var defaultColor = '#4e4e4e';
            var defaultHoverColor = '#101010';
            var setColor = attrs.color || defaultColor;
            var setHoverColor = attrs.hover || defaultHoverColor;
            elem.attr({
              'fill': setColor
            });
            elem.on('mouseover', function(){
              elem.attr('fill', setHoverColor);
            });
            elem.on('mouseout', function(){
              elem.attr('fill', setColor);
            });
          }
        };
      }
    ]);
  });

  //Glyphicons icon
  angular.forEach([
    'close', 'minus'
  ], function(name){
    var directiveName = 'icon' + name.charAt(0).toUpperCase() + name.slice(1);
    directives.directive(directiveName, [
      function(){
        return {
          restrict: 'E',
          replace: true,
          templateUrl: 'template/icons/' + name + '.html',
          link: function(scope, elem, attrs){}
        };
      }
    ]);
  });

});
