/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/4
 * Time: 19:15
 */

define([
  'util'
], function(util){

  'use strict';

  var gui = require('nw.gui');
  var guiWin = gui.Window.get();
  var conf = require('./conf/app.conf');

  return {
    showWin: function(){
      guiWin.show();
    },
    minWin: function(){
      guiWin.minimize();
    },
    closeWin: function(){
      guiWin.close();
    },
    settingMenu: function(){
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({
        label: '编辑器',
        click: function(){
          util.openEdit();
        }
      }));
      menu.append(new gui.MenuItem({ label: '设 置' }));
      menu.append(new gui.MenuItem({ label: '帮 助' }));
      menu.append(new gui.MenuItem({
        label: '关 于',
        click: function(){
          util.appInfo();
        }
      }));
      menu.append(new gui.MenuItem({ type: 'separator' }));
      menu.append(new gui.MenuItem({ label: '退 出', click: this.closeWin}));
      return menu;
    },
    callMiniCodeEditor: function(file_path){
      util.openEdit(file_path);
    }
  };

});