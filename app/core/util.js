/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/2
 * Time: 16:27
 */

define([
  'text!template/ui/alert.html',
  'text!template/ui/modal.html'
], function(alertTpl, modalTpl){

  'use strict';

  var fs = require('fs');
  var conf = require('./conf/app.conf');
  console.log(conf);

  function clearnMask(id){
    $('#mask_' + id).remove();
  }

  return {
    getParams: function(url){
      var _url = url || window.location.href;
      var index = _url.indexOf('?');
      var params = {};
      if(index !== -1){
        var paramsStr = _url.slice(index + 1); // 获取到问号以后的字符串
        var paramsArr = paramsStr.split('&');
        // 把url上的所有参数塞到json对象中,以键值对的方式保存
        for(var i = 0, length = paramsArr.length, param; i < length; i++){
          param = paramsArr[i].split('=');
          params[param[0]] = param[1]
        }
      }
      return params;
    },

    parseFile: function(file_path){
      var a = file_path.split('.');
      return a.length > 0 ? a[a.length - 1] : null;
    },

    isSupportFile: function(file_path){
      var stat = fs.lstatSync(file_path);
      if(stat.isFile()){
        var type = this.parseFile(file_path);
        if(type && conf.supportFile.indexOf(type.toLowerCase()) > -1){
          return true;
        }else{
          this.alert("MiniCodeEditor can't open this file!<br> Only support: " + conf.supportFile.join(' , '));
          return false;
        }
      }else{
        this.error("Can't to open a Directory!");
        return false;
      }
    },

    alert: function(message, isError, isSuccess){
      var html = alertTpl.replace(/\{\{message\}\}/g, message);
      if(isSuccess){
        html = html.replace(/\{\{type\}\}/g, "success");
      }else{
        html = html.replace(/\{\{type_title\}\}/g, isError === true ? "Error!" : "Warning!");
        html = html.replace(/\{\{type\}\}/g, isError === true ? "danger" : "warning");
      }
      var $elem = $(html);
      var rtime = +new Date();
      var $mask = $('<div id="mask_' + rtime + '" class="mask"></div>');
      if(isSuccess){
        $elem.find('.alert-title').remove();
      }
      $elem.on('closed.bs.alert', function(){
        clearnMask(rtime);
      });
      $mask.appendTo('body');
      $elem.appendTo('body');
      if(isSuccess){
        setTimeout(function(){
          $elem.remove();
          clearnMask(rtime);
        }, 2000);
      }
    },

    error: function(message){
      this.alert(message, true);
    },

    success: function(message){
      this.alert(message, false, true);
    },

    dialog: function(opt){
      var html, setting = {
        title: '',
        content: '',
        footer: true,
        header: true,
        onOpen: function(){},
        onCancel: function(){},
        onOk: function(){}
      };
      opt = $.extend(setting, opt);
      html = modalTpl.replace(/\{\{title\}\}/g, opt.title);
      html = html.replace(/\{\{content\}\}/g, opt.content);
      var $elem = $(html);
      $elem.on('shown.bs.modal', opt.onOpen);
      $elem.on('hidden.bs.modal', opt.onCancel);
      !opt.header && $elem.find('.modal-header').css('border-bottom', 'none');
      !opt.footer && $elem.find('.modal-footer').remove();
      $elem.appendTo('body');
      $elem.modal();
    }
  };

});