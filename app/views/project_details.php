<div class="box">
	<div class="project_details">
		<h2><?php echo $project["name"];?></h2>
        <div class="info">
        	<p>创建时间 : <?php echo $project["creat_time"];?></p>
        	<p>项目描述 : <?php echo $project["desc"];?></p>
        </div>
        <dl class="members" id="members">
        	<dt><strong>成员</strong></dt>
            <dd>
                <p>管理人员 : </p>
                <p>开发人员 : <?php foreach($project["members"] as $val){?><a href="#"><?php echo $val;?></a>&nbsp;&nbsp;<?php }?></p>
                <p>测试人员 : </p>
            </dd>
        </dl>
        <dl class="problems">
        	<dt><strong>问题跟踪</strong></dt>
            <dd>
                <p>需求 : </p>
                <p>bug : </p>
            </dd>
        </dl>
        <dl class="configs">
        	<dt><strong>静态配置</strong></dt>
            <dd>
            	<p><span>模板路径 : </span><em><?php echo $project["html_path"];?></em></p>
                <p><span>css路径 : </span><em><?php echo $project["css_path"];?></em></p>
                <p><span>js路径 : </span><em><?php echo $project["js_path"];?></em></p>
                <p><span>点击这里查看 : </span><a href="javascript:feLoadTemplate('<?php echo $project["project_static_path"]; ?>')">项目模块列表</a></p>
            </dd>
        </dl>
        <dl class="others">
        	<dt><strong>项目备注</strong></dt>
            <dd>
            	<?php echo $project["mark"];?>
            </dd>
        </dl>
	</div>
</div>