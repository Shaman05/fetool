/**
 * Created with JetBrains WebStorm.
 * Author: Devin Chen
 * Date: 8/3/12
 * Time: 2:56 PM
 * To change this template use File | Settings | File Templates.
 */

;(function($){
    $.fn.sort_menu = function(options){
        var setting = {
            data : null,         //下拉数据
            bind : null,         //绑定click
            left : 0,            //下拉列表左边位移
            top : 0,             //下拉列表左边位移
            theme : "default",   //主题类型
            showIcon : false,    //icon
            select: 0            //默认选中项
        };
        var opt = $.extend(setting, options);
        this.each(function(){
            if(!opt.data)return;
            var _this = $(this);
            var label = $("<label></label>");
            var ul = $("<ul/>",{"class" : "sort-menu sort-menu-" + opt.theme})
                        .css({
                            "width" : _this.outerWidth() - 2,
                            "top" : _this.outerHeight() - 2 + opt.top,
                            "left" : opt.left - 1
                        });
            var icon = $("<em/>", {"class" : "sort-menu-icon"});
            $.each(opt.data, function(i,elem){
                var li = $("<li/>")
                    .html("<a href='javascript:void(\"" + elem[1] + "\")'>" + elem[0] + "</a>")
                    .on("click",Fn)
                    .data("keyValue", elem[1])
                    .appendTo(ul);
                if(i == opt.select){
                    label.text(elem[0]);
                    li.attr("flag", "selected");
                }
            });
            _this.append(label).append(ul);
            if (opt.showIcon)_this.append(icon);

            function Fn(){
                var _this = $(this);
                var dataVal = _this.data("keyValue");
                if(_this.attr("flag") != "selected"){
                    if(opt.bind(dataVal)){
                        label.text(_this.text());
                        ul.find("li[flag=selected]").attr("flag", "");
                        _this.attr("flag", "selected");
                    }
                }
                ul.hide();
            }

            _this.hover(function(){
                $(this).addClass("sort-menu-hover");
                ul.show();
            },function(){
                $(this).removeClass("sort-menu-hover");
                ul.hide();
            });
        });
        return this;
    }
})(jQuery);