/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/9
 * Time: 17:35
 */

define([
  './main.js'
], function(main){

  'use strict';

  var fs = require("fs");
  var gui = require("nw.gui");
  var conf = require("./conf/app.conf");
  var confFile = conf.conf_file();
  var editor = main.getEditor();

  var clipboard = gui.Clipboard.get();
  var menu = new gui.Menu();
  var themeMenu = createThemeMenu();
  menu.append(new gui.MenuItem({ label: 'New', click: newFile }));
  menu.append(new gui.MenuItem({ label: 'Open', click: openFile }));
  menu.append(new gui.MenuItem({ label: 'Save (ctrl+s)', click: saveFile }));
  menu.append(new gui.MenuItem({ type: 'separator' }));
  menu.append(new gui.MenuItem({ label: 'Copy', click: copy }));
  menu.append(new gui.MenuItem({ label: 'Cut', click: cut }));
  menu.append(new gui.MenuItem({ label: 'Paste', click: past }));
  menu.append(new gui.MenuItem({ type: 'separator' }));
  menu.append(new gui.MenuItem({ label: 'Theme', submenu: themeMenu }));

  function createThemeMenu(){
    var themeList = new gui.Menu();
    var currentMenu = conf.codeTheme;
    for(var i = 0; i < conf.codeThemes.length; i++){
      (function(item){
        themeList.append(new gui.MenuItem({
          type: 'checkbox',
          label: item,
          checked: item === currentMenu,
          enabled: item !== currentMenu,
          click: function(){
            setTheme(this, themeList.items, function(menu){
              conf.codeTheme = menu.label;
              main.getEditor().setOption("theme", conf.codeTheme);
              //同时将选择保存到配置
              fs.readFile(confFile, 'utf8', function(err, data){
                var content = data.replace(/codeTheme: ".*"/ig, 'codeTheme: "' + conf.codeTheme + '"');
                fs.writeFile(confFile, content, 'utf8', function(err){
                  if (err) alert('保存配置出错：' + err);
                });
              });
            });
          }
        }));
      })(conf.codeThemes[i]);
    }
    return themeList;
  }

  function setTheme(menu, menuList, callback){
    menuList.forEach(function(item, index){
      item.checked = false;
      item.enabled = true;
    });
    menu.checked = true;
    menu.enabled = false;
    callback && callback(menu);
  }

  function copy(){
    clipboard.set(editor.getSelection());
  }

  function cut(){
    clipboard.set(editor.getSelection());
    editor.replaceSelection('');
  }

  function past(){
    editor.replaceSelection(clipboard.get());
  }

  function newFile(){
    $("#new").trigger("click");
  }

  function openFile(){
    $("#openFile").trigger("click");
  }

  function saveFile(){
    $("#saveFile").trigger("click");
  }

  return {
    init: function(){
      document.getElementById("editor").addEventListener('contextmenu', function(ev) {
        ev.preventDefault();
        menu.popup(ev.x - 2, ev.y - 2);
        return false;
      });
    }
  };

});