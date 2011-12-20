<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>fetool</title>
<link rel="stylesheet" type="text/css" href="css/fetool.css">
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/fetool.ui.js"></script>
<script type="text/javascript" src="js/fetool.action.js"></script>
</head>

<body>
<div class="header">
	<div class="logo">
    	<h1><a href="#" title="fetool">Fetool</a><span>前端助手</span></h1>
    </div>
    <div class="about">
    	<h3>A modular front-end development tools</h3>
    </div>
    <div class="login">
    	<!--未登录-->
        <p style="display:none">您目前是游客</a>&nbsp;&nbsp;<a href="login.php">登录</a>&nbsp;&nbsp;<a href="register.php">注册</a></p>
        <!--//未登录-->
    	<!--已登录-->
    	<div class="isLogin clearfix">
        	<div class="logined">
            	欢迎您，<a id="member" class="member" href="javascript:">shaman<em class="normal"></em></a>
            	<ul id="member_setting" class="member_setting">
                    <li><a href="#">基本资料</a></li>
                    <li><a href="#">我的仓库</a></li>
                    <li><a href="#">账号安全</a></li>
                </ul>
            </div>
            <a href="#" style="float:right; margin-right:-30px">退出</a>
        </div>
        <!--已登录-->
    </div>
    <div class="nav">
    	<a class="current" href="javascript:feLoad('module_list')" title="module list">模块列表</a>
        <a href="javascript:feLoad('my_module')" title="my module">我的模块</a>
        <a href="javascript:feLoad('add_module')" title="add module">新增模块</a>
        <a href="javascript:feLoad('flatten')" title="diy page by yourself">页面拼合</a>
    </div>
    <div class="htool">
    	<!--拼合页工具-->
    	<div class="flatten_tool" style="display:none">
        	<a href="#" title="拼合配置">拼合配置</a>
            <a href="#" title="清除配置缓存">清除配置缓存</a>
            <a class="export" href="#" title="导出">导出</a>
        </div>
        <!--//拼合页工具-->
        <!--模块列表页工具-->
    	<div class="search_tool">
            <form method="get" action="search">
                <input class="ipt" type="text" name="search_cont" id="search_cont">
                <!--<input class="fbtn" type="submit" value="Search" id="search_submit">-->
            </form>
        </div>
        <!--//模块列表页工具-->
    </div>
</div>