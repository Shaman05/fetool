/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/4
 * Time: 19:15
 */

define([
  'util',
  'text!template/fragment/appInfo.html'
], function(util, appInfoTpl){

  'use strict';

  var gui = require('nw.gui');
  var guiWin = gui.Window.get();
  var pkg = require('../package.json');

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
      menu.append(new gui.MenuItem({ label: '编辑器', click: openEdit }));
      menu.append(new gui.MenuItem({ label: '设 置' }));
      menu.append(new gui.MenuItem({ label: '帮 助' }));
      menu.append(new gui.MenuItem({ label: '关 于', click: appInfo }));
      menu.append(new gui.MenuItem({ type: 'separator' }));
      menu.append(new gui.MenuItem({ label: '退 出', click: this.closeWin}));
      return menu;
    }
  };

  function appInfo(){
    var info = appInfoTpl.replace(/\{\{version\}\}/g, pkg.version);
    info = info.replace(/\{\{userAgent\}\}/g, navigator.userAgent);
    info = info.replace(/\{\{nodeVersion\}\}/g, process.version);
    util.dialog({
      title: '关于前端助手',
      content: info,
      footer: false
    });
  }

  function openEdit(){
    gui.Window.open('../addon/miniCodeEdit/main.html', {
      "width": 800,
      "height": 520,
      "show": false,
      "title": "Mini Code Editor",
      "frame": false,
      "toolbar": true,
      "icon": "app/images/logo.png"
    });
  }

});