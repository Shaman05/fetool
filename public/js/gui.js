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
  var $frame = $('#main-frame');
  uiInit();

  win.ui = {
    getMenu: function(){
      var menu = new gui.Menu();
      var userMenu = createUserMenu();
      var settingMenu = createSetting();
      var importMenu = createImport();
      var exportsMenu = createExports();
      var helpMenu = createHelp();
      var aboutMenu = createAbout();
      var logoutMenu = createLogout();
      var separator = separatorLine();

      menu.append(userMenu);
      menu.append(settingMenu);
      menu.append(separator);
      menu.append(importMenu);
      menu.append(exportsMenu);
      menu.append(separator);
      menu.append(helpMenu);
      menu.append(aboutMenu);
      menu.append(logoutMenu);
      return menu;
    }
  };

  function uiInit(){

    var dialog = {
      default: {
        autoOpen: false,
        resizable: false,
        buttons: {Ok: close}
      },
      init: function(){
        $("#about").dialog($.extend(this.default, {
          modal: true,
          width: 500
        }));
      }
    };
    dialog.init();


    function close(){
      $(this).dialog("close");
    }
  }

  function menu(options){
    return new gui.MenuItem(options);
  }

  //账户菜单
  function createUserMenu(){
    var userItem = menu({
      label: '账 户',
      enabled: false
    });
    var subMenu = new gui.Menu();
    subMenu.append(menu({ label: '账户信息'}));
    subMenu.append(menu({ label: '修改密码'}));
    userItem.submenu = subMenu;
    return userItem;
  }

  //设置
  function createSetting(){
    return menu({
      label: '设 置',
      enabled: false
    });
  }

  //导入
  function createImport(){
    return menu({
      label: '导 入',
      enabled: false
    });
  }

  //导出
  function createExports(){
    var exportsItem = menu({
      label: '导 出',
      enabled: false
    });
    var subMenu = new gui.Menu();
    subMenu.append(menu({ label: '导出代码碎片'}));
    subMenu.append(menu({ label: '我的笔记'}));
    exportsItem.submenu = subMenu;
    return exportsItem;
  }

  //帮助
  function createHelp(){
    var helpItem = menu({label: '帮 助'});
    var subMenu = new gui.Menu();
    subMenu.append(menu({
      label: 'Fetool 介绍',
      icon: "public/images/icon_home.png",
      click: function(){
        $frame.attr('src', 'home.html');
      }
    }));
    subMenu.append(menu({
      label: 'wiki',
      click: function(){
        gui.Window.open('https://github.com/Shaman05/fetool', {
          position: 'center',
          title: '加载中...',
          toolbar: false,
          height: 500,
          width: 1100
        });
      }
    }));
    helpItem.submenu = subMenu;
    return helpItem;
  }

  //关于
  function createAbout(){
    return menu({
      label: '关 于',
      click: function(){
        $('#about').dialog('open');
      }
    });
  }

  //退出
  function createLogout(){
    return menu({
      label: '退 出',
      icon: "public/images/gui_logout.png",
      click: function(){
        Window.close();
      }
    });
  }

  //分割线
  function separatorLine(){
    return menu({type: 'separator'});
  }

})(window);