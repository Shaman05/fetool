<div class="box">
    <div class="module_selected">
    	<h3>已选模块</h3>
        <ul id="module_selected_list">
        </ul>
    </div>
</div>
<script type="text/javascript">
$(function(){
	
})

function loadSelectModules(arr){  //加载选择模块
	var mbox=$("#module_selected_list"),li="";
	mbox.empty();
	if(arr.length==0){
		li+='<li class="no_select">尚未选择模块！</li>';
	}else{
		$.each(arr,function(i){
			li+='<li><span class="dragObj" id="module_'+arr[i].id+'" rel="module_'+arr[i].id+'">'+arr[i].name+'</span></li>';
		})
	}
	$(li).appendTo(mbox);
}
</script>