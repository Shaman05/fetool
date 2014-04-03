/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-2-12
 * Time: 上午10:39
 */

(function(win){

  'use strict';

  var gui = require('nw.gui');
  var Window = gui.Window.get();

  win.tray = {
    init: function(){
      // Create a tray icon
      var tray = new gui.Tray({
        title: '前端代码碎片工具',
        icon: '../../public/images/logo.png'
      });

      // Give it a menu
      var menu = new gui.Menu();
      var logout = new gui.MenuItem({
        label: '退出',
        click: function(){
          Window.close();
        }
      });
      var wiki = new gui.MenuItem({
        label: 'wiki-帮助文档',
        click: function(){
          gui.Window.get(
            win.open('https://github.com/Shaman05/fetool', '前端代码碎片工具 - wiki')
          );
        }
      });

      menu.append(wiki);
      menu.append(new gui.MenuItem({type: 'separator'}));
      menu.append(logout);
      tray.menu = menu;
    }
  };

  win.tray.init();

})(window);