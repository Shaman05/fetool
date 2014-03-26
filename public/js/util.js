/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-25
 * Time: 下午3:02
 */

(function(root, $){

  'use strict';

  var util = {
    //执行事件
    eventExec: function(origin, eventGroup){
      var e = util.eventAnalysis(origin);
      if(typeof eventGroup[e.groupName] === 'function'){
        eventGroup[e.groupName].apply(this, e.args);
        return;
      }
      eventGroup[e.groupName][e.eventFn].apply(this, e.args);
    },
    throwEvent: function(e, eventGroup){
      var $this = $(this);
      //事件类型
      var eventMap = {
        click: 'event-click',
        focusin: 'event-focus',
        focusout: 'event-blur',
        change: 'change'
      };
      if(!eventGroup)return false;
      var _fn = $this.attr(eventMap[e.type]);
      var _args = $this.attr('data-args');
      util.eventExec.call(this, {event: _fn, args: _args}, eventGroup);
    },
    //事件代理解析, 支持以命名空间形式定义的事件名称
    eventAnalysis: function(origin){
      var _events = origin.event.split('.');
      var _eventFn = _events[1]; //获取事件处理句柄
      var _eventGroup = _events[0]; //获取事件分组类型
      var _args = origin.args; //事件参数
      _args = (_args && _args.split(',')) || []; //获取事件参数
      return {
        groupName: _eventGroup,
        eventFn: _eventFn,
        args: _args
      };
    },
    //分发页面事件
    eventInit: function(eventGroup){
      $(document)
      .on('click', '[event-click]', function(e){
        util.throwEvent.call(this, e, eventGroup);
        e.stopPropagation && e.stopPropagation();
        e.cancelBubble && (e.cancelBubble = true);
      })
      .on('focus', '[event-focus]', function(e){
        util.throwEvent.call(this, e, eventGroup);
      })
      .on('blur', '[event-blur]', function(e){
        util.throwEvent.call(this, e, eventGroup);
      })
      .on('change', '[event-change]', function(e){
        util.throwEvent.call(this, e, eventGroup);
      });
    },
    //加载中
    showLoading: function($obj){
      var isIframe = $obj.is('iframe');
      var isAbsolute = $obj.css('position') === 'absolute';
      var $mask = $('<div class="loading"></div>').hide();
      if(isIframe){
        $mask.appendTo($('body', $obj[0].contentWindow.document)).fadeIn(200);
      }else{
        !isAbsolute && $obj.css('position', 'relative');
        $mask.appendTo($obj).fadeIn(200);
      }
    },
    //隐藏loading
    hideLoading: function($obj){
      var isIframe = $obj.is('iframe');
      $('.loading', isIframe ? $obj[0].contentWindow.document : $obj).remove();
    }
  };

  root.util = util;

})(window, jQuery);