<div class="box">
	<div class="add_row">
    	<h3>选择添加类型 :</h3>
        <div class="ats">
            <select id="module_type">
                <option selected value="add_base">基本模块</option>
                <option value="add_extend">扩展模块</option>
            </select>
            <select id="base_modules" disabled>
            	<option selected value="unselect">选择扩展模块的基类</option>
            </select>
        </div>
    </div>
    <div id="nbm">
    	<div class="add_row">
            <h3>模块类型 :</h3>
            <div id="radios" class="ats">
                <input type="radio" name="new_type" value="0" checked><span>基础模块</span>
                <input type="radio" name="new_type" value="1"><span>框架模块</span>
            </div>
        </div>
        <div class="add_row">
            <h3>基类类名 :</h3>
            <div class="ats">
                <input type="text" id="new_bc_name" size="16">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
$(function(){
	var mts=$("#module_type"),
		bms=$("#base_modules"),
		nbm=$("#nbm");
	mts.change(function(){
		var val=$(this).val();
		if(val == "add_extend"){ //触发级联
			bms.attr("disabled",false).empty().append($('<option selected value="unselect">选择扩展模块的基类</option>'));
			nbm.hide();
			$.getJSON("index.php/action?action=get_class",function(data){  //获取所有基类类名
				var _options="";
				for (var key in data){
					_options+='<option value="'+key+'">'+key+'</option>';
				}
				$(_options).appendTo(bms);
				bms.attr("data","loaded");
			})
		}else{
			bms.attr("disabled",true);
			nbm.show();
		}
	})
})
</script>