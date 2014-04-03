/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-3
 * Time: 下午12:14
 */

(function(win){

  'use strict';

  var gui = require('nw.gui');

  win.ui = {
    getMenu: function(){
      var menu = new gui.Menu();
      var userMenu = createUserMenu();
      var settingMenu = createSetting();
      var importMenu = createImport();
      var exportsMenu = createExports();
      var logoutMenu = createLogout();
      var separator = separatorLine();

      menu.append(userMenu);
      menu.append(settingMenu);
      menu.append(separator);
      menu.append(importMenu);
      menu.append(exportsMenu);
      menu.append(separator);
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
    /*var menuItem = new gui.MenuItem({
      label: 'Click me!',
      icon: "image/1.png",
      enabled: false,
      click: function(){
        //todo
      }
    });*/
    subMenu.append(new gui.MenuItem({ label: '账户信息' }));
    subMenu.append(new gui.MenuItem({ label: '修改密码' }));
    /*subMenu.append(menuItem);*/
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
    subMenu.append(new gui.MenuItem({ label: '导出代码碎片' }));
    subMenu.append(new gui.MenuItem({ label: '我的笔记' }));
    exportsItem.submenu = subMenu;
    return exportsItem;
  }

  //退出
  function createLogout(){
    return new gui.MenuItem({label: '退 出'});
  }

  //分割线
  function separatorLine(){
    return new gui.MenuItem({type: 'separator'});
  }

})(window);