/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-11
 * Time: 下午4:12
 */

(function(win){

  'use strict';

  var gui = require('nw.gui');
  var Window = gui.Window.get();
  var maxFlag = false;

  //系统托盘
  win.tray.init();

  win.eventGroup = {
    /*-------UI-------*/
    //最小化
    minWindow: function(){
      Window.minimize();
    },
    //最大化
    maxWindow: function(){
      maxFlag ? Window.unmaximize() : Window.maximize();
      maxFlag = !maxFlag;
    },
    //关闭
    closeWindow: function(){
      Window.close();
    }
  };

  Window.on('maximize', resizeWrap);
  Window.on('unmaximize', resizeWrap);

  function resizeWrap(){
    //todo
  }

})(window);