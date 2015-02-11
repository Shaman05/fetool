/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/10
 * Time: 13:40
 */

define([
  'util',
  'gui'
], function(util, gui){

  'use strict';

  global.$ = $;
  global.fe_util = util;

  var fs = require('fs');
  var path = require('path');
  var abar = require('./node_modules/address_bar');
  var folder_view = require('./node_modules/folder_view');
  var conf = require('./conf/app.conf');

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){

    var folder = new folder_view.Folder($('#files'));
    var addressbar = new abar.AddressBar($('#addressbar'));
    var current_path = conf.dataRoot();

    util.isValidDir(current_path);

    folder.open(current_path);
    addressbar.set(current_path);

    folder.on('navigate', function(dir, mime) {
      if (mime.type == 'folder') {
        addressbar.enter(mime);
      } else {
        if(util.isSupportFile(mime.path)){
          gui.callMiniCodeEditor(mime.path);
        }
      }
    });

    addressbar.on('navigate', function(dir) {
      folder.open(dir);
    });

    $scope.$apply();
  }];

});