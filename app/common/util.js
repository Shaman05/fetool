/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-18
 * Time: 下午12:20
 */
var $ = require('../../lib/node_modules/jquery');
var util = {};

util.render = function($container, html, callback){
  util.showMask($container);
  $container.html(html);
  util.hideMask($container);
  callback && callback();
};

util.showMask = function($container){
  $container.css('position') !== 'absolute' && $container.css('position', 'relative');
  var $mask;
  var $loading = $container.find('.loading');
  if($loading.size() > 0){
    $mask = $loading;
    $mask.css('display', 'none');
  }else{
    $mask = $('<div class="maskLayer loading"></div>');
    $mask.css({
      display: 'none',
      height: $container.outerHeight(),
      width: $container.outerWidth()
    });
    $container.append($mask);
  }
  $mask.fadeIn(350);
};

util.hideMask = function($container){
  $container.find('.loading').fadeOut(350);
};

module.exports = util;