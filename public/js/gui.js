/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-3
 * Time: 下午12:14
 */

(function(win){

  'use strict';

  var gui = require('nw.gui');
  var Window = gui.Window.get();

  win.ui = {
    getMenu: function(){
      var menu = new gui.Menu();
      var userMenu = createUserMenu();
      var settingMenu = createSetting();
      var importMenu = createImport();
      var exportsMenu = createExports();
      var helpMenu = createHelp();
      var logoutMenu = createLogout();
      var separator = separatorLine();

      menu.append(userMenu);
      menu.append(settingMenu);
      menu.append(separator);
      menu.append(importMenu);
      menu.append(exportsMenu);
      menu.append(separator);
      menu.append(helpMenu);
      menu.append(logoutMenu);
      return menu;
    }
  };

  //账户菜单
  function createUserMenu(){
    var userItem = new gui.MenuItem({
      label: '账 户'
    });
    var subMenu = new gui.Menu();
    subMenu.append(new gui.MenuItem({ label: '账户信息' }));
    subMenu.append(new gui.MenuItem({ label: '修改密码' }));
    userItem.submenu = subMenu;
    return userItem;
  }

  //设置
  function createSetting(){
    return new gui.MenuItem({label: '设 置'});
  }

  //导入
  function createImport(){
    return new gui.MenuItem({label: '导 入'});
  }

  //导出
  function createExports(){
    var exportsItem = new gui.MenuItem({label: '导 出'});
    var subMenu = new gui.Menu();
    subMenu.append(new gui.MenuItem({ label: '导出代码碎片'}));
    subMenu.append(new gui.MenuItem({ label: '我的笔记'}));
    exportsItem.submenu = subMenu;
    return exportsItem;
  }

  //帮助
  function createHelp(){
    var helpItem = new gui.MenuItem({label: '帮 助'});
    var subMenu = new gui.Menu();
    subMenu.append(new gui.MenuItem({label: 'Wiki'}));
    subMenu.append(new gui.MenuItem({label: 'About'}));
    helpItem.submenu = subMenu;
    return helpItem;
  }

  //退出
  function createLogout(){
    return new gui.MenuItem({
      label: '退 出',
      icon: "public/images/gui_logout.png",
      click: function(){
        Window.close();
      }
    });
  }

  //分割线
  function separatorLine(){
    return new gui.MenuItem({type: 'separator'});
  }

})(window);