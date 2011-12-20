<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?php echo $title;?></title>
<link rel="stylesheet" type="text/css" href="static/css/fetool.css">
<link rel="stylesheet" type="text/css" href="static/jq-ui/css/ui-darkness/jquery-ui-1.8.16.custom.css">
<script type="text/javascript" src="static/js/jquery.min.js"></script>
<script type="text/javascript" src="static/edit_area/edit_area/edit_area_full.js"></script>
<script type="text/javascript" src="static/codeHighlight/jquery.syntax.min.js"></script>
<script type="text/javascript" src="static/js/fetool.ui.js"></script>
<script type="text/javascript" src="static/js/fetool.action.js"></script>
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
    	<?php if(!$isLogin){ ?>
        <p>您目前是游客</a>&nbsp;&nbsp;<a href="index.php/login">登录</a>&nbsp;&nbsp;<a href="index.php/register">注册</a></p>
        <?php }else{ ?>
    	<div class="isLogin clearfix">
        	<div class="logined">
            	欢迎您，<a id="member" class="member" href="javascript:"><?php echo $user; ?><em class="normal"></em></a>
            	<ul id="member_setting" class="member_setting">
                    <li><a href="#">基本资料</a></li>
                    <li><a href="#">我的仓库</a></li>
                    <li><a href="#">账号安全</a></li>
                </ul>
            </div>
            <a href="index.php/login" style="float:right; margin-right:-30px">退出</a>
        </div>
        <?php } ?>
    </div>
    <?php if(!$isLogin){ ?>
    <div class="nav">
    	<a class="current" href="javascript:feLoad('module_list')" title="module list">模块列表</a>
        <a href="index.php/login" title="my module">我的模块</a>
        <a href="index.php/login" title="add module">新增模块</a>
        <a href="javascript:feLoad('flatten')" title="diy page by yourself">页面拼合</a>
    </div>
    <?php }else{ ?>
    <div class="nav">
    	<a href="javascript:feLoad('module_list')" title="module list">模块列表</a>
        <a class="current" href="javascript:feLoad('my_module')" title="my module">我的模块</a>
        <a href="javascript:feLoad('add_module')" title="add module">新增模块</a>
        <a href="javascript:feLoad('flatten')" title="diy page by yourself">页面拼合</a>
    </div>
    <?php } ?>
    <div class="htool" id="htool">
        <?php if(!$isLogin){ ?>
    	<div class="search_tool">
            <form id="search_form">
                <input class="ipt" type="text" name="search_cont" id="search_cont" placeholder="输入关键字" title="please enter key word" >
                <input class="fbtn" type="submit" value="Search" title="search">
            </form>
        </div>
        <?php }else{ ?>
        <p>我的工具条</p>
        <?php } ?>
    </div>
</div>