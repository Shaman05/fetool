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
		
		$(".nav > ul > li").hover(
			function(){
				$(this).find(".sub_nav").css("display","block");
			},
			function(){
				$(this).find(".sub_nav").css("display","none");
			}
		)
		
		$(".nav > ul > li").click(
			function(){
				$(this).find(".sub_nav").toggle();
			}
		)
	} 
	function wResize(){
		c.css("height",b.outerHeight()-128);
	} 
})

//全局方法
function _leftHandlClick(cSet){
	var c=$("#content"),
		cl=$("#colHandle_left");
	if(c.attr("statu")=="on"){
		c.attr("statu","off").css("padding-left",cSet.pl);
		cl.attr("title","收起");
	}else{
		c.attr("statu","on").css("padding-left","5px");
		cl.attr("title","展开");
	}
}
	
function filter_module(){
	$("#filter_module li").not(".none").click(function(){
		$(this).addClass("current").siblings().removeClass("current");
		
		var _filter_str=$.trim($(this).find("a").text());
		if(_filter_str!="查看全部"){
			$(".module_list").css("display","none").find(".base_module").filter(function(){
				return $.trim($(this).text())==_filter_str;
			}).parents(".module_list").css("display","block");
		}else{
			$(".module_list").css("display","block");
		}
	})
}

function feDialog(options,callback){
	if(typeof(options)!="object")
		return;
	var setting={
		title:"新的窗口",
		content:"新的内容",
		width:400,
		height:260,
		button:true
	};
	var opt=$.extend(setting,options),
		rid="feDialog"+new Date().getTime(),
		feDialog_b=opt.button?'<div class="feDialog_b"><span class="edit_error">:( 提交失败，请新尝试！</span><span class="edit_ok">:) 提交成功！</span><span class="edit_tip">正在提交修改</span><a id="editOk" href="javascript:void(0)" title="Determine changes" rel="'+rid+'">确定</a></div>':'',
		ch=opt.button?opt.height-50:opt.height-26;
		dialog='<div id="'+rid+'" class="feDialog" style="width:'+opt.width+'px;height:'+opt.height+'px;margin:-'+opt.height/2+'px 0 0 -'+opt.width/2+'px">'+
	               '<div class="feDialog_t">'+
				       '<h4>'+opt.title+'</h4><a href=javascript:closeFedialog("'+rid+'") title="close feDialog">关闭</a>'+
				   '</div>'+
				   '<div class="feDialog_c" style="height:'+ch+'px">'+opt.content+
				   '</div>'+
				   feDialog_b+
			   '</div>';
	$(".feMasklayer").fadeIn(500,function(){
		$(dialog).appendTo($("body")).show(200);
		if(callback)
			callback();
	});
}
function closeFedialog(rid){
	$("#"+rid).hide(300,function(){
		$(this).remove();
		$(".feMasklayer").fadeOut(500);
	})
}

function is_in_array(e,arr){
	for(var i=0; i<arr.length; i++){
		if(e == arr[i])
			return true;
	}
	return false;
}

//创建编辑器相关
var _html_code=null,_html_title="未知模块",_css_code=null,_css_title="未知作者";
function creatEdit(obj,opt,codeType){
	var default_tools="fullscreen, search, go_to_line, undo, redo, select_font, |, save, |, help";
	editAreaLoader.init({
		id: obj
		,start_highlight: true
		,allow_toggle: false
		,allow_resize: "y"
		,word_wrap: true
		,language: "en"
		,toolbar: default_tools
		,syntax: codeType
		,syntax_selection_allow: "css,html,js,php"
		,is_multi_files: true
		,EA_load_callback: opt
		,save_callback: "code_save"
		,show_line_colors: true
	});
}
function creatEditArea(id){
	if(id=="code_box"){
		load_html();
		load_css();
	}
}
function load_html(){
	var new_file={id:"html_code", text:_html_code, syntax:'html', title:_html_title};
	editAreaLoader.openFile('code_box', new_file);
}
function load_css(){
	var new_file={id:"css_code", text:_css_code, syntax:'css', title:_css_title};
	editAreaLoader.openFile('code_box', new_file);
}
function code_save(id,content){
	var a=$("#frame_code_box").get(0).contentWindow.document,
		b=$("#tab_browsing_list",a),
		c=b.find("li.selected"),
		file=c.attr("id"),
		re=/tab_file/g,
		type=file.replace(re,'');
	var s=window.localStorage,
		current_edit=JSON.parse(s.getItem("current_edit"));
	if(type=="_html_code"){
		_html_code=content;
		current_edit.html=content;
	}else if(type=="_css_code"){
		_css_code=content;
		current_edit.css=content;
	}else{
		alert("未知类型，请重新尝试保存！");
		return;
	}
	c.find("a").removeClass("edited");
	s.setItem("current_edit",JSON.stringify(current_edit)); //更新当前被编辑模块的新的代码
}