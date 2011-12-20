/*
 * fetool.action.js
 * http://www.fetool.com/
 * base on jquery
 * Last edit by shaman on 2011-12-13
 */
;$(function(){
	//feLoad('module_list');
})

function feLoad(type){
	var colLeft=$("#colLeft"),
		colMain=$("#colMain"),
		status=$("#status"),
		isLeftLoad=false,
		isMainLoad=false;
	status.show();
	colLeft.load("col_left.php?type="+type,function(){
		isLeftLoad=true;
	});
	colMain.load("col_main.php?type="+type,function(){
		isMainLoad=true;
	});
	
	var timer=setTimeout(function(){
			if(isLeftLoad && isMainLoad){
				status.hide();
				clearTimeout(timer);
			}	
		},100);
}

