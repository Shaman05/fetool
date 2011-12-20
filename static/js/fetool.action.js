/*
 * fetool.action.js
 * http://www.fetool.com/
 * base on jquery
 * Last edit by shaman on 2011-12-13
 */
;
var s=window.localStorage;
var colLeft=null,
	colMain=null,
	htool=null,
	status=null;
$(function(){
	//feLoad('module_list');
	feInitStorage();
	
	colLeft=$("#colLeft"),
	colMain=$("#colMain"),
	htool=$("#htool"),
	status=$("#status");
	
	$("#search_form").live({
		"submit":function(){
			var keyValue=$.trim($("#search_cont").val());
			if(keyValue!=""){
				colLeft.load("index.php/load_page/module_left/search/"+keyValue);
				colMain.load("index.php/load_page/module_list_main/"+keyValue);
				$(".nav a").removeClass("current");
			}
			return false;
		}
	})
})

function feLoad(type){
	var isHtoolLoad=false,
		isLeftLoad=false,
		isMainLoad=false;
	//status.show();
	
	var htoolFun="index",
		leftFun="index",
		mainFun="index";
	switch (type){
		case "module_list":
			leftFun="module_left/all";
			mainFun="module_list_main";
			htoolFun="search_tool";
			break;
		case "my_module":
			leftFun="module_left/mine";
			mainFun="my_module_main";
			htoolFun="my_tool";
			break;
		case "add_module":
			leftFun="add_module_left";
			mainFun="add_module_main";
			htoolFun="my_tool";
			break;
		case "flatten":
			leftFun="flatten_left";
			mainFun="flatten_main";
			htoolFun="flatten_tool";
			break;
		default:
			break;
	}
	htool.load("index.php/load_page/"+htoolFun,function(){
		isHtoolLoad=true;
	});
	colLeft.load("index.php/load_page/"+leftFun,function(){
		isLeftLoad=true;
	});
	colMain.load("index.php/load_page/"+mainFun,function(){
		isMainLoad=true;
	});
	
	/*var timer=setTimeout(function(){
			if(isHtoolLoad && isLeftLoad && isMainLoad){
				status.hide();
				clearTimeout(timer);
			}	
		},100);*/
}

function feInitStorage(){
	if(window.localStorage){
		var s=window.localStorage,
			current_edit={
				id:null,
				html:null,
				css:null
			};
		s.setItem("current_edit",JSON.stringify(current_edit));
	}else{
		alert("对不起，您所使用的浏览器不支持本地存储功能！请使用支持本地存储的浏览器，如：Firefox,Chrome等支持Html5的浏览器");
		window.location.href="index.php/login";
		return;
	}
}

