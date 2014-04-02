/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-11
 * Time: 下午4:12
 */
(function(){

  'use strict';

  var gui = require('nw.gui');
  var Window = gui.Window.get();
  var maxFlag = false;

  $(function(){

    var $niceScroll = $('.niceScroll');
    $niceScroll.niceScroll({cursorcolor: '#384043'});
    $niceScroll.css('visibility', 'visible');

    var $toggleWin = $('.max-size');

    util.eventInit({
      //最小化
      minWindow: function(){
        Window.minimize();
      },
      //最大化
      maxWindow: function(){
        maxFlag ? Window.unmaximize() : Window.maximize();
      },
      //关闭
      closeWindow: function(){
        Window.close();
      },
      //未登录菜单
      callMenu: function(){},
      //设置
      callSetting: function(){}
    });

    Window.on('maximize', function(){
      maxFlag = true;
      $toggleWin.addClass('toggle-size');
    });
    Window.on('unmaximize', function(){
      maxFlag = false;
      $toggleWin.removeClass('toggle-size');
    });

  });

})();