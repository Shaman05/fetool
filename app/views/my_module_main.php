<div class="box">
	<?php foreach($module_list as $list): ?>
    <div class="module_list">
        <div class="module_list_t">
            <div class="module_list_t_left">
                <span>模块基类 : <strong class="base_module"><?php echo $list['name'];?></strong></span>
                <span>编号 : <i><?php echo $list['id'];?></i></span>
            </div>
            <div class="module_list_t_right">
                <a class="edit_module" href="javascript:void(0)" title="编辑模块">EDIT</a>
                <a class="delete_btn" href="javascript:void(0)" title="删除模块">DELETE</a>
                <input type="hidden" name="id" value="<?php echo $list['id'];?>">
                <input type="hidden" name="name" value="<?php echo $list['name'];?>">
            </div>
        </div>
        <div id="modCont<?php echo $list['id']; ?>" class="module_list_c">
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
		
		$(".delete_btn").click(function(){  //删除模块
			var _this=$(this);
			if(confirm("确定删除吗？")){
				var id=_this.siblings("input[name=id]").val();
				$.getJSON("index.php/action?action=delete_module&modId="+id,function(data){
						if(data.statu){
							_this.parents(".module_list").remove();
							feLoad("my_module");
						}
						alert(data.message)
					}
				)
			}
		})
		
		$(".edit_module").click(function(){  //编辑模块
			var id=$(this).siblings("input[name=id]").val(),
				name=$(this).siblings("input[name=name]").val();
			$.getJSON("index.php/action?action=get_module_code&module_id="+id,function(data){
				feDialog({
						title:name,
						height:400,
						width:600,
						content:'<textarea id="code_box" style="width:100%;height:100%"></textarea>'
					},function(){
						_html_code=data.html_code;
						_html_title=name+" html"
						_css_code=data.css_code;
						_css_title=name+" css";
						creatEdit("code_box","creatEditArea","html");
						
						var s=window.localStorage,
							current_edit=JSON.parse(s.getItem("current_edit"));
							current_edit.id=id;
							current_edit.html=_html_code;
							current_edit.css=_css_code;
						s.setItem("current_edit",JSON.stringify(current_edit));  //存储当前编辑模块的初始代码
						$("#editOk").click(function(){
							var html=_html_code.replace(/<script.*?>.*?<\/script>/ig, ''),
								css=_css_code;
							if($.trim(html)==""){
								alert("html结构为空，如果删除，请执行删除操作！");
								return;
							}
							var okTip=$(".edit_ok"),
								error=$(".edit_error"),
								rq=$(".edit_tip");
							$.ajax({
								type:"POST",
								url:"index.php/action",
								data:"action=update_module&modId="+id+"&html="+encodeURIComponent(html)+"&css="+encodeURIComponent(css),
								beforeSend:function(){
									okTip.hide();
									error.hide();
									rq.show();
								},
								error:function(){
									rq.fadeOut(300,function(){error.show()});
								},
								success:function(msg){
									rq.fadeOut(300,function(){
										if(msg=="success"){
											okTip.show();
										}else{
											error.show();
										}
									});
									feLoad("my_module");
								}
							})
						})
				})//feDialog end
			});
		})
    })
    </script>
</div>