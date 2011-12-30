<div class="box">
	<div class="projects">
		<h4>项目列表</h4>
        <div class="project_list">
        	<table width="100%" cellpadding="0" cellspacing="0">
            	<thead>
                	<tr>
                    	<th>ID</th>
                        <th>名称</th>
                        <th>描述</th>
                        <th>成员</th>
                        <th>静态配置</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                	<?php foreach($project as $key){ ?>
                	<tr id="project_<?php echo $key["id"]; ?>">
                    	<td align="center"><strong><?php echo $key["id"]; ?></strong></td>
                        <td align="center"><?php echo $key["name"]; ?></td>
                        <td><?php echo $key["miaoshu"]; ?></td>
                        <td><?php echo $key["members"]; ?></td>
                        <td class="configs">
                            <p><span>模板路径 :</span><em><?php echo $key["html_path"];?></em></p>
                            <p><span>css路径 :</span><em><?php echo $key["css_path"];?></em></p>
                            <p><span>js路径 :</span><em><?php echo $key["js_path"];?></em></p>
                            <p><span>项目模块路径 : </span><em><?php echo $key["project_static_path"];?></em></p>
                        </td>
                        <td align="center">
                        	<a href="javascript:feSingleLoad('project/management/edit/<?php echo $key["id"]; ?>')">编辑</a>
                            <a href="javascript:del_project('<?php echo $key["id"]; ?>')">删除</a>
                        </td>
                    </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>
	</div>
</div>
<script type="text/javascript">
function del_project(id){  //删除项目
	if(confirm("确定删除吗？")){
		$.getJSON("index.php/action?action=delete_project&pid="+id,function(data){
				if(data.statu){
					$("#project_"+id).remove();
				}
				alert(data.message)
			}
		)
	}
}
</script>