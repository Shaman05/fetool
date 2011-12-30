<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>页面加载页</title>
</head>

<body>
<iframe id="mainIframe" class="perloading" src="#" height="99%" width="100%" frameborder="0">
</iframe>
<script type="text/javascript" src="static/js/jquery.min.js"></script>
<script type="text/javascript">
$(function(){
	var ifram=$("#mainIframe"),
		url="<?php echo $_GET["p"];?>?t="+new Date().getTime();
	ifram.attr("src",url).load(function(){
		$(this).removeClass("perloading");
	})
})
</script>
</body>
</html>