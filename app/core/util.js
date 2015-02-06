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

  return {
    alert: function(message, isError){
      var html = alertTpl.replace(/\{\{message\}\}/g, message);
      html = html.replace(/\{\{type_title\}\}/g, isError === true ? "Error!" : "Warning!");
      html = html.replace(/\{\{type\}\}/g, isError === true ? "danger" : "warning");
      var $elem = $(html);
      var rtime = +new Date();
      var $mask = $('<div id="mask_' + rtime + '" class="mask"></div>');
      $elem.on('closed.bs.alert', function(){
        $('#mask_' + rtime).remove();
      });
      $mask.appendTo('body');
      $elem.appendTo('body');
    },

    error: function(message){
      this.alert(message, true);
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