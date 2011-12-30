<div class="box">
	<div class="projects">
		<h4>最近的项目</h4>
		<ul>
        	<?php foreach($project_list as $key){ ?>
			<li>
                <a href="javascript:feSingleLoad('project/details/<?php echo $key["id"];?>')"><?php echo $key["name"];?></a> (<?php echo $key["creat_time"];?>)
                <p>项目描述 : <?php echo $key["miaoshu"];?></p>
			</li>
            <?php } ?>
		</ul>
	</div>
</div>