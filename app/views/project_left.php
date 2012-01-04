<div class="box">
	<h3>项目列表</h3>
    <ul class="project_ul project_list">
    	<?php foreach($project_list as $key){ ?>
    	<li><a href="javascript:feSingleLoad('project/details/<?php echo $key["id"];?>')"><?php echo $key["name"];?></a></li>
        <?php } ?>
    </ul>
    <?php if($user_rank == "0"){ ?>
    <h3>项目管理</h3>
    <ul class="project_ul">
    	<li><a href="javascript:feSingleLoad('project/management/add')">新增项目</a></li>
        <li><a href="javascript:feSingleLoad('project/management/modify')">管理项目</a></li>
    </ul>
    <?php } ?>
</div>