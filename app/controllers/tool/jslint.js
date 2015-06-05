/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([
  'util',
  'file',
  'gui'
], function(util, file, fe_gui){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    var jslint = require('./node_modules/node-jslint').JSLINT;
    var report = util.report($('#jslint-log-content'));

    $scope.currentPage = 'JSLint 语法检测';
    $scope.currentDir = '';
    $scope.dirList = [].concat(getHistoryDir());
    $scope.fileList = [];
    $scope.fileCount = 0;
    $scope.readDir = function(dir){
      $scope.currentDir = dir;
      util.showLoading();
      file.getFilesByDir(dir, 'js', function(err, files){
        if(!err){
          $scope.fileList = files;
          $scope.fileCount = files.length;
          util.hideLoading();
          show_file_list();
          $scope.$apply();
        }
      });
    };
    $scope.refreshDir = function(){
      if(!$scope.currentDir){
        return;
      }
      $scope.readDir($scope.currentDir);
    };
    $scope.clear_dirList = function(){
      $('#select_dir').val('');
      util.clearLocalStorage('historyDir');
      hide_file_list();
      $scope.dirList = [];
      $scope.fileList = [];
      $scope.clear_jslint_log();
    };
    $scope.start_jslint = function(){
      if($scope.fileList.length === 0){
        return false;
      }
      show_file_list();
      $scope.clear_jslint_log();
      $scope.view_log();
      try {
        $scope.fileList.forEach(function (item, i) {
          setTimeout(function () {
            jslint_file(item['file']);
          }, 500);
        });
      }catch (e){
        util.alert(e, true);
      }
    };
    $scope.jslint_file = function(file_path){
      $scope.clear_jslint_log();
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
    $scope.enter = function(ev){
      if(ev.keyCode !== 13){
        return false;
      }
      var $this = $(ev.target);
      var index = $this.attr('data-index');
      var title = $.trim($this.val());
      if(title){
        $scope.dirList[index].title = title;
        util.setLocalStorage('historyDir', $scope.dirList);
      }
      $this.fadeOut();
    };

    $('#select_dir').on('change', function(){
      var list,
          path = this.value;
      if(!isPathExist(path)){
        list = getHistoryDir();
        list.push({
          path: path,
          title: path
        });
        util.setLocalStorage('historyDir', list);
        $scope.dirList = list;
        $scope.$apply();
      }
    });

    $('#file-list').delegate('li', 'contextmenu', function(e) {
      e.stopPropagation();
      fe_gui.callJslintContextMenu(e, {
        jslint: function(file_path){
          $scope.clear_jslint_log();
          $scope.view_log();
          setTimeout(function(){
            jslint_file(file_path);
          }, 800);
        },
        deleteFile: function(index){
          $scope.fileList.splice(index, 1);
          $scope.$apply();
        }
      });
    });

    $('#history-dir').delegate('li', 'contextmenu', function(e) {
      e.stopPropagation();
      fe_gui.callJslintHistoryDirContextMenu(e, {
        openDir: function(dir_path){
          dir_path && $scope.readDir(dir_path);
        },
        rename: function($item, index){
          $item.find('input').fadeIn().focus();
        },
        deleteDir: function(index){
          $scope.dirList.splice(index, 1);
          $scope.$apply();
          util.setLocalStorage('historyDir', $scope.dirList);
        }
      });
    });

    function show_file_list(){
      //$('.container-fluid').addClass('split-container-50');
      setTimeout(function(){
        $('.file-list').fadeIn();
      }, 500);
    }
    function hide_file_list(){
      $('.file-list').fadeOut(function(){
        //$('.container-fluid').removeClass('split-container-50');
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

    function jslint_file(file_path, next){
      if(file.getFileSuffix(file_path) !== 'js'){
        return;
      }
      report.info('~~~~~ Start JSLint for "' + file_path + '" ~~~~~');
      var fileContent = file.getFileSync(file_path);
      var startTime = +new Date();
      var result;
      result = jslint(fileContent, {
        eqeq: $scope.eqeq
      });
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
      $('#jslint-log-content').scrollTop(9999999);
    }

    function putError(err){
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