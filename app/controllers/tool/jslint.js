/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([
  'util',
  'file'
], function(util, file){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    var jslint = require('./node_modules/node-jslint').JSLINT;
    var report = util.report($('#jslint-log-content'));

    $scope.currentPage = 'JSLint 语法检测';
    $scope.dirList = [].concat(getHistoryDir());
    $scope.fileList = [];
    $scope.readDir = function(dir){
      file.getFilesByDir(dir, 'js', function(err, files){
        if(!err){
          $scope.fileList = files;
          show_file_list();
          $scope.$apply();
        }
      });
    };
    $scope.clear_dirList = function(){
      $('#select_dir').val('');
      util.clearLocalStorage('historyDir');
      hide_file_list();
      $scope.dirList = [];
      $scope.fileList = [];
    };
    $scope.start_jslint = function(){
      if($scope.fileList.length === 0){
        return false;
      }
      show_file_list();
      $scope.view_log();
      setTimeout(function(){
        $scope.fileList.forEach(function(item, i){
          jslint_file(item['file']);
        });
      }, 500);
    };
    $scope.jslint_file = function(file_path){
      jslint_file(file_path);
    };
    $scope.view_log = function(){
      $('#jslint-log').fadeIn();
    };
    $scope.close_jslint_log = function(){
      $('#jslint-log').fadeOut();
    };
    $scope.clear_jslint_log = function(){
      $('#jslint-log-content').empty();
    };

    $('#select_dir').on('change', function(){
      var list,
          path = this.value;
      if(!isPathExist(path)){
        list = getHistoryDir();
        list.push({path: path});
        util.setLocalStorage('historyDir', list);
        $scope.dirList = list;
        $scope.$apply();
      }
    });

    function show_file_list(){
      $('.container-fluid').addClass('split-container-50');
      setTimeout(function(){
        $('.file-list').fadeIn();
      }, 500);
    }
    function hide_file_list(){
      $('.file-list').fadeOut(function(){
        $('.container-fluid').removeClass('split-container-50');
      });
    }

    function getHistoryDir(){
      return util.getLocalStorage('historyDir') || [];
    }

    function isPathExist(path){
      var dirList = getHistoryDir();
      for(var i = 0; i < dirList.length; i++){
        if(path === dirList[i].path){
          return true;
        }
      }
      return false;
    }

    function jslint_file(file_path){
      report.info('~~~~~ Start JSLint for "' + file_path + '" ~~~~~');
      var fileContent = file.getFileSync(file_path);
      var startTime = +new Date();
      var result;
      try{
        result = jslint(fileContent, {});
      }catch (e){
        report.error(e);
      }
      var error = jslint.errors;
      var error_count = error[error.length - 1] === null ? error.length - 1 : error.length;
      if(!result){
        putError(error);
      }else{
        report.success('Congratulations to no error! :)');
      }
      var endTime = +new Date();
      report.info('~~~~~ JSLint completed, ' + error_count + ' error, time consuming: ' + (endTime - startTime) + 'ms. ~~~~~');
      report.br();
    }

    function putError(err){
      console.log(err);
      var buff = [];
      err.forEach(function(item, i){
        buff = [];
        if(item){
          item.id && buff.push(item.id);
          item.line && buff.push(' line ' + item.line);
          item.evidence && buff.push(item.evidence);
          item.reason && buff.push(item.reason);
          item && report.error(buff.join(', '));
        }
      });
    }

    $scope.$apply();
  }];

});