/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-7-8
 * Time: 上午11:15
 */

(function(){
  'use strict';

  var exec = require('child_process').exec;
  var path = require('path');
  var fs = require('fs');
  var _util = require('../common/util');

  var $errorText = $('#errorText');
  var $errorMessage = $('#errorMessage');
  var $compileBtn = $('[data-compiling]');
  var lessEditor, cssEditor;
  var page = {
    init: function(){
      lessEditor = CodeMirror.fromTextArea(document.getElementById("lessSource"), {
        mode: "text/css",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'monokai'
      });
      cssEditor = CodeMirror.fromTextArea(document.getElementById("cssSource"), {
        mode: "text/css",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        styleActiveLine: true,
        matchBrackets: true,
        readOnly: true,
        theme: 'monokai'
      });

    },
    compileLess: function(){
      var $this = $(this);
      var lessContent = $.trim(lessEditor.getValue());
      if(!lessContent || $this.attr('data-compiling') == '1')return;
      $this.attr('data-compiling', '1');
      $this.text('开始生成文件...');

      //创建临时文件
      var now = new Date().getTime();
      var lessFile = 'temp_' + now + '.less';
      fs.writeFile(lessFile, lessContent, 'utf8', function(err){
        if(err){
          showError('生成临时文件失败！');
          resetCompileBtn();
          return false;
        }else{
          $this.text('开始编译...');
          compileFile(lessFile, function(cssFile){
            $this.text('编译完成...');
            readCssFile(cssFile);
          });
        }
      });
    }
  };
  page.init();
  util.eventInit(page);

  //编译LESS
  function compileFile(file, callback){
    var cssFile = file + '.css';
    var cmd = ['node', 'app/node_modules/less/bin/lessc', file, '>', cssFile].join(' ');
    exec(cmd, {encoding: 'utf-8'}, function(error, stdout, stderr) {
      _util.deleteFolderRecursive(file);
      if(error !== null) {
        _util.deleteFolderRecursive(cssFile);
        showError('编译出错，请检查Less代码语法：', stderr);
        resetCompileBtn();
        return;
      }
      callback && callback(cssFile);
    });
  }

  //读取编译后的CSS
  function readCssFile(file){
    fs.readFile(file, 'utf8', function(err, data){
      _util.deleteFolderRecursive(file);
      if(err){
        showError('读取编译文件出错！');
        resetCompileBtn();
        return;
      }
      cssEditor.setValue(data);
      resetCompileBtn();
    });
  }

  function showError(text, msg){
    $errorText.text(text);
    msg && $errorMessage.text(msg);
    $('#errorModel').modal();
  }

  function resetCompileBtn(){
    $compileBtn.html('LESS <span class="glyphicon glyphicon-chevron-right"></span> CSS').attr('data-compiling', 0);
  }

})();