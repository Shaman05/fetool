/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/11
 * Time: 15:38
 */

define([
  'util'
], function(util){

  'use strict';

  var fs = require('fs');
  var path = require('path');

  return {
    /**
     * 异步获取文件内容
     * @param file_path
     * @param callback
     */
    getFile: function(file_path, callback){
      if(fs.existsSync(file_path)){
        fs.readFile(file_path, 'utf8', function(err, data){
          if(err){
            callback(err);
          }else{
            callback(null, data);
          }
        });
      }else{
        callback('文件不存在！');
      }
    },

    /**
     * 同步获取文件内容
     * @param file_path
     */
    getFileSync: function(file_path){
      return fs.readFileSync(file_path, 'utf8');
    },

    getFileSuffix: function(file_path){
      var type = file_path.split('.');
      return type.length === 1 ? '' : type[type.length - 1];
    },

    /**
     * 递归删除文件或文件夹
     * @param file_path
     * @param callback
     */
    deleteFile: function(file_path, callback){
      function doDeleteFile(_file_path){
        var files = [];
        if(fs.existsSync(_file_path)){
          if(!fs.statSync(_file_path).isDirectory()){
            fs.unlinkSync(_file_path);
          }else{
            files = fs.readdirSync(_file_path);
            files.forEach(function(file, index){
              var curPath = path.join(_file_path, file);
              if(fs.statSync(curPath).isDirectory()){
                doDeleteFile(curPath);
              }else{
                fs.unlinkSync(curPath);
              }
            });
            fs.rmdirSync(_file_path);
          }
        }
      }
      doDeleteFile(file_path);
      callback && callback();
    },

    /**
     * 使用递归异步获取文件夹文件
     * @param dir
     * @param suffix 指定类型
     * @param callback 回调
     */
    getFilesByDir: function(dir, suffix, callback){
      var m = this,
          fileArr = [],
          hasError = null;
      _getFilesByDir(dir, suffix, function(err){
        callback(err, fileArr);
      });
      function _getFilesByDir(dir, suffix, callback){
        fs.readdir(dir, function(err, files){
          if(err){
            callback(err);
            util.hideLoading();
            return;
          }
          hasError = each(files, function(file, callback) {
            var path_name = path.join(dir, file);
            var stat = fs.statSync(path_name);
            var type = m.getFileSuffix(path_name);
            if (stat.isDirectory()) {
              !hasError && _getFilesByDir(path_name, suffix, callback);
            } else {
              if(type === suffix || suffix === ''){
                fileArr.push({
                  type: type,
                  file: path_name,
                  size: m.formatSize(stat.size)
                });
              }
              callback();
            }
          }, function() {
            callback(err);
          });
        });
      }
    },

    formatSize: function(size){
      var kb = 1024;
      var mb = kb * 1024;
      var gb = mb * 1024;
      var tb = gb * 1024;
      if(size > tb){
        return p2Number(size/tb) + 'TB';
      }
      if(size > gb){
        return p2Number(size/gb) + 'GB';
      }
      if(size > mb){
        return p2Number(size/mb) + 'MB';
      }
      if(size > kb){
        return p2Number(size/kb) + 'KB';
      }
      return size + 'Bytes';
      function p2Number(num){
        return Math.ceil(num * 100)/100;
      }
    }
  };

  function each(arr, iterator, callback) {
    callback = callback || function () {};
    if (!arr.length) {
      return callback();
    }
    var completed = 0;
    try {
      arr.forEach(function (x) {
        return !iterator(x, function (err) {
          if (err) {
            callback(err);
            callback = function () {
            };
          } else {
            completed += 1;
            if (completed >= arr.length) {
              callback(null);
            }
          }
        });
      });
    }catch (e){
      util.alert(e, true);
      util.hideLoading();
      return true;
    }
  }

});