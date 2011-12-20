/*
 * fetool.ui.js
 * http://www.fetool.com/
 * base on jquery
 * Last edit by shaman on 2011-12-12
 */
;$(function(){
	var b =$("body"),
		c =$("#content"),
		cl=$("#colHandle_left"),
		m =$("#member"),
		ms=$("#member_setting");
	init();
	
	
	
	function init(){
		wResize();
		$(window).resize(function(){
			wResize();
		})
	
		var cSet={
				pl:c.css("padding-left"),
				pr:c.css("padding-right")
			};
		_leftHandlClick(cSet);
		cl.click(function(){
			_leftHandlClick(cSet)
		})
		
		m.click(function(e){
			e.stopPropagation();
			m.find("em").toggleClass("slideDown");
			ms.slideToggle(300);
		})
		
		$("body").click(function(e){
			e.stopPropagation();
			m.find("em").removeClass("slideDown");
			ms.slideUp(300);
		})
		
		$(".nav a,.module_name_list li").bind({
			"click":function(){
				$(this).addClass("current").siblings().removeClass("current");
			}
		})
	} 
	function wResize(){
		c.css("height",b.outerHeight()-128);
	} 
	function _leftHandlClick(cSet){
		if(c.attr("statu")=="on"){
			c.attr("statu","off").css("padding-left",cSet.pl);
			cl.attr("title","收起");
		}else{
			c.attr("statu","on").css("padding-left","5px");
			cl.attr("title","展开");
		}
	}
})