<div class="box">
	<h3>模块名称列表</h3>
    <ul id="filter_module" class="module_name_list">
        <?php if($module_name!=0){foreach($module_name as $val): ?>
        <li title="查看所有 <?php echo $val; ?> 模块"><a href="javascript:"><?php echo $val; ?></a></li>
        <?php endforeach; ?>
        <li class="current"><a href="javascript:void(0)">查看全部</a></li>
        <?php }else{ ?>
        <li class="none moved"><a href="#">当前无模块</a></li>
        <?php } ?>
    </ul>
    <script type="text/javascript">
    filter_module();
    </script>
</div>