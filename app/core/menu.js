/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 20:37
 */

define([
  'util',
  'gui',
  'text!template/fragment/appInfo.html'
], function(util, gui, appInfoTpl){

  'use strict';

  var pkg = require('../package.json');
  var guiWin = gui.getWin();

  return {
    settingMenu: function(){
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({ label: '设 置' }));
      menu.append(new gui.MenuItem({ label: '帮 助' }));
      menu.append(new gui.MenuItem({ label: '关 于', click: appInfo }));
      menu.append(new gui.MenuItem({ type: 'separator' }));
      menu.append(new gui.MenuItem({ label: '退 出', click: logout}));
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

  function logout(){
    //todo something
    guiWin.close();
  }

});