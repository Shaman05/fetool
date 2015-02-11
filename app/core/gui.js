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

    callMiniCodeEditor: function(file_path){
      util.openEdit(file_path);
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