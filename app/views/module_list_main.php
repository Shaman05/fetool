<div class="box">
	<?php foreach($module_list as $list): ?>
    <div class="module_list">
        <div class="module_list_t">
            <div class="module_list_t_left">
                <span>模块基类：<strong class="base_module"><?php echo $list['name'];?></strong></span>
                <span>编号：<?php echo $list['id'];?></span>
            </div>
            <div class="module_list_t_right">
                <span>模块作者：<?php echo $list['author'];?></span>
                <span>最后更新时间：<?php echo $list['last_edit']; ?></span>
                <span><a class="veiw_btn" href="javascript:void(0)" title="查看html">HTML</a></span>
            </div>
        </div>
        <div class="module_list_c">
            <iframe src="index.php/module_block/show_block/<?php echo $list['id']?>" class="perloading"></iframe>
            <div class="html_code" style="display:none">
                <pre class="syntax brush-html">
<?php echo trim(htmlspecialchars($list['html']));?>
                </pre>
            </div>
        </div>
    </div>
    <?php endforeach; ?>
    <script type="text/javascript">
    $(function(){
        $(".module_list_c iframe").load(function(){
            var h=$(this.contentWindow.document.documentElement).outerHeight();
            $(this).removeClass("perloading").css({"height":h});
        })
        jQuery.syntax();
        $(".veiw_btn").click(function(){
            $(this).parents(".module_list").find(".html_code").toggle();
        })
    })
    </script>
</div>