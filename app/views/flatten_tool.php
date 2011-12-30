<div class="flatten_tool">
	<a href="javascript:select_module()" title="模块选择">模块选择</a>
    <a href="#" title="配置框架">配置框架</a>
    <a href="#" title="选择框架">选择框架</a>
    <a href="#" title="清除配置缓存">清除配置缓存</a>
    <a class="export" href="#" title="导出">导出</a>
</div>
<script type="text/javascript">
function select_module(){
	feDialog({
		title:"选择模块",
		height:500,
		width:780,
		content:'<iframe src="index.php/select_module" height="100%" width="100%" frameborder="0"></iframe>',
		button:false
	})
}
</script>