/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/11
 * Time: 15:38
 */

define([], function(){

  'use strict';

  var fs = require('fs');
  var path = require('path');

  return {
    /**
     * 删除文件或文件夹（递归）
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
    }
  };

});