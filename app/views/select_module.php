<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>fetool - 模块选择</title>
<style type="text/css">
html,body{height:100%; width:100%}
body{font-size:12px}
body,ul,li{margin:0; padding:0}
ul,ol{list-style:none; overflow:hidden}
#moduleList li{float:left; width:116px; margin:12px 0 0 10px; border:1px #CCC dotted}
#moduleList li:hover{border:1px solid #39F}
.mc iframe{border:0; border:none; overflow:hidden; -moz-transform:scale(0.3); -webkit-transform:scale(0.3, 0.3); position:absolute; top:50%; left:50%}
.mt{text-align:center; padding-bottom:3px; background:#FF9}
.mc{width:100px; height:100px; overflow:hidden; margin:0 auto; position:relative}
</style>
</head>

<body>
<ul id="moduleList">
<?php foreach($modules as $item){?>
	<li>
    	<div class="mc"><iframe src="module_block/show_block_scale/<?php echo $item['id']?>" class="perloading"></iframe></div>
    	<div class="mt" id="module_<?php echo $item['id'];?>">
			<strong><?php echo $item['name'];?></strong><br>
            <input type="checkbox" value="<?php echo $item['id'];?>" title="选择模块">
            <span class="viewMod" title="预览模块">view module</span>
            <span class="refrash" title="重新加载模块">reload module</span>
        </div>	
    </li>
<?php }?>
</ul>
<div class="page">
	
</div>
<div class="button">
	<a href="javascript:getSelectModulesId()" title="确定">确定</a>
</div>
<script type="text/javascript" src="../static/js/jquery.min.js"></script>
<script type="text/javascript">
var s=window.localStorage;
$(function(){
	$("#moduleList iframe").load(function(){
		var h=$(this.contentWindow.document.documentElement).outerHeight(),
			w=$(this.contentWindow.document.documentElement).outerWidth();
		$(this)
			.removeClass("perloading")
			.css({
					"height":h+"px",
					"width":w+"px",
					"margin":-h/2+"px 0 0 "+(-w/2)+"px"
				});
	})
})

function getSelectModulesId(){
	var arr=[];
	$("#moduleList input[type=checkbox]").each(function(i){
		if($(this).attr("checked")){
			var module={};
			module.id=$(this).val();
			module.name=$(this).siblings("strong").text();
			arr.push(module)
		}
	});
	var p=window.parent;
	p.loadSelectModules(arr);
	$(".feDialog",p.document).hide(300,function(){
		$(this).remove();
		$(".feMasklayer",p.document).hide();
	})
}
</script>
</body>
</html>