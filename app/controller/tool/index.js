/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-7-8
 * Time: 上午11:15
 */

(function(){
  'use strict';

  var topDoc = window.top.document;
  var $frame = $('#main-frame', topDoc);

  var tool = {
    openUrl: function(e, url){
      $frame.attr('src', url);
    }
  };
  util.eventInit(tool);
})();