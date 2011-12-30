<div class="box">
	<div class="projects">
		<h4>编辑项目</h4>
        <div class="project_edit">
        	<table width="100%" cellpadding="0" cellspacing="0">
            	<tr>
                	<td width="80" align="right">项目名称 : </td>
                    <td><input class="text" type="text" size="15" id="pname" <?php if($isEdit){ ?>value="<?php echo $name; ?>"<?php } ?>></td>
                </tr>
                <tr>
                	<td width="80" align="right" valign="top">项目成员 : </td>
                    <td>
                    	<div class="edit_members" id="edit_members">
                    	<?php if($isEdit){
								if(count($members) == 0){ ?>
							<span>尚未添加成员</span>
							<?php }else{
									foreach($members as $val){ ?>
                            <a href="#" title="点击移除该成员"><?php echo $val; ?></a>
                         		<?php }
								}
							} ?>
                        </div>
                        <div class="add_members"><a href="javascript:add_members()" style="text-decoration:underline; color:#060">添加成员</a></div>
                    </td>
                </tr>
                <tr>
                	<td width="80" align="right">css路径 : </td>
                    <td><input class="text" type="text" size="40" id="css_path" <?php if($isEdit){ ?>value="<?php echo $css_path; ?>"<?php } ?>></td>
                </tr>
                <tr>
                	<td width="80" align="right">js路径 : </td>
                    <td><input class="text" type="text" size="40" id="js_path" <?php if($isEdit){ ?>value="<?php echo $js_path; ?>"<?php } ?>></td>
                </tr>
                <tr>
                	<td width="80" align="right">模板路径 : </td>
                    <td><input class="text" type="text" size="40" id="html_path" <?php if($isEdit){ ?>value="<?php echo $html_path; ?>"<?php } ?>></td>
                </tr>
                <tr>
                	<td width="80" align="right">项目静态路径 : </td>
                    <td><input class="text" type="text" size="80" id="project_static_path" <?php if($isEdit){ ?>value="<?php echo $project_static_path; ?>"<?php }else{ ?>value="http://www.baidu.com"<?php } ?>></td>
                </tr>
                <tr>
                	<td width="80" align="right" valign="top">项目描述 : </td>
                    <td><textarea class="textarea" cols="60" rows="4" id="pdesc"><?php if($isEdit){ echo $desc; }else{ ?>200字以内<?php } ?></textarea></td>
                </tr>
                <tr>
                	<td width="80" align="right" valign="top">项目备注 : </td>
                    <td><textarea class="textarea" cols="80" rows="4" id="pmark"><?php if($isEdit){ echo $mark; }else{ ?>1000字以内<?php } ?></textarea></td>
                </tr>
                <tr>
                	<td><input id="edit_pid" type="hidden" <?php if($isEdit){ ?>value="<?php echo $id; ?>"<?php } ?>></td>
                    <td><a class="form_btn" href="javascript:submit_edit()">确定</a></td>
                </tr>
            </table>
        </div>
	</div>
</div>
<script type="text/javascript">
$(function(){
	$("#edit_members").click(function(e){
		if($(e.target).attr("class") != "edit_members")
			$(e.target).remove();
		return false;
	})
})

function add_members(){  //添加成员
	var temp=[]; //已选成员
	$("#edit_members a").each(function(){
		temp.push($(this).text());
	})
	$.getJSON("index.php/action?action=get_all_users",function(data){
		var list='<ul class="member_select_list" id="member_select_list">';
		for(i in data){
			if(is_in_array(data[i].name,temp))
				list+='<li><span>'+data[i].name+'</span><input type="checkbox" value="'+data[i].name+'" checked></li>';
			else
				list+='<li><span>'+data[i].name+'</span><input type="checkbox" value="'+data[i].name+'"></li>';
		}
		list+='</ul>';
		feDialog({
				title:"添加成员窗口",
				content:list,
				width:500,
				height:300	
			},function(){
				$("#editOk").click(function(){
					var selected=[],members="";
					$("#member_select_list input").each(function(){
						if($(this).attr("checked"))
							selected.push($(this).val());
					});
					for(var i=0; i<selected.length; i++){
						members+='<a href="#" title="点击删除该成员">'+selected[i]+'</a>';
					}
					$("#edit_members").html(members);
					
					$(".feDialog").remove();
					$(".feMasklayer").fadeOut(300);
				})	
		});
	})
}

function submit_edit(){
	var temp=[]; //已选成员
	$("#edit_members a").each(function(){
		temp.push($(this).text());
	})
	var url="index.php/action?action=edit_project";
	var data={
			"id":$("#edit_pid").val(),
			"name":$.trim($("#pname").val()),
			"desc":$.trim($("#pdesc").val()),
			"members":temp.join(","),
			"css_path":$.trim($("#css_path").val()),
			"js_path":$.trim($("#js_path").val()),
			"html_path":$.trim($("#html_path").val()),
			"project_static_path":$.trim($("#project_static_path").val()),
			"mark":$.trim($("#pmark").val())
		};
	$.get(url,data,function(msg){
			alert(msg);
		})
}
</script>