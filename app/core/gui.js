/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/4
 * Time: 19:15
 */

define([
  'util',
  'file'
], function(util, file){

  'use strict';

  var fs = require('fs');
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

    callFileContextMenu: function(e){
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({
        label: '打 开',
        click: function(){
          $(e.target).closest('.file').trigger('dblclick');
        }
      }));
      menu.append(new gui.MenuItem({
        label: '删 除',
        click: function(){
          var file_path = $(e.target).closest('.file').attr('data-path');
          deleteFile(file_path);
        }
      }));
      menu.popup(e.pageX - 2, e.pageY - 2);
    },

    callAddNewFileContextMenu: function(e){
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({
        label: 'New folder',
        click: function(){

        }
      }));
      menu.append(new gui.MenuItem({
        label: 'New file',
        click: function(){

        }
      }));
      menu.popup(e.pageX - 2, e.pageY - 2);
    },

    callMiniCodeEditor: function(file_path){
      util.openEdit(file_path);
    },

    callJslintContextMenu: function(e, action){
      var $item = $(e.target);
      var file_path = $item.attr('title');
      var index = $item.attr('data-index');
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({
        label: '执行JSLint',
        click: function(){
          action.jslint(file_path);
        }
      }));
      menu.append(new gui.MenuItem({
        label: '打开文件',
        click: function(){
          util.openEdit(file_path);
        }
      }));
      menu.append(new gui.MenuItem({
        label: '从列表移除',
        click: function(){
          action.deleteFile(index);
        }
      }));
      menu.popup(e.pageX - 2, e.pageY - 2);
    },

    callJslintHistoryDirContextMenu: function(e, action){
      var $item = $(e.target);
      var index = $item.attr('data-index');
      var dir_path = $item.attr('data-dir');
      var menu = new gui.Menu();
      menu.append(new gui.MenuItem({
        label: '打 开',
        click: function(){
          action.openDir(dir_path);
        }
      }));
      menu.append(new gui.MenuItem({
        label: '重命名',
        click: function(){
          action.rename($item, index);
        }
      }));
      menu.append(new gui.MenuItem({
        label: '移除该文件夹',
        click: function(){
          action.deleteDir(index);
        }
      }));
      menu.popup(e.pageX - 2, e.pageY - 2);
    }

  };

  function deleteFile(file_path){
    util.confirm({
      content: '确认删除吗？',
      onOk: function(){
        file.deleteFile(file_path, function(){
          util.success('Deleted!');
          $('#addressbar').find('.active').find('a').trigger('click');
        });
      }
    });
  }

});