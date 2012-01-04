<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><?php echo $title;?></title>
<link rel="stylesheet" type="text/css" href="../static/css/fetool.login.css">
</head>

<body>
<form id="register_form" action="">
    <div class="login_wrap">
        <div class="register_box">
            <div class="register_form clearfix">
            	<h1>REGISTER</h1>
                <div class="reg_enter">
                	<label>User Name:</label>
                    <input class="txt" type="text" id="reg_name" value="输入注册用户名" onFocus="this.value=this.value=='输入注册用户名'?'':this.value" />
                </div>
                <div class="reg_enter">
                	<label>Password:</label>
                    <input class="txt" type="password" id="pwd" title="这里输入密码" />
                </div>
                <div class="reg_enter">
                	<label>Email:</label>
                    <input class="txt" type="text" id="email" title="这里输入您的邮箱">
                </div>
                <div class="reg_enter">
                	<input type="submit" class="reg_btn" title="提交注册" value="SUBMIT" />
                </div>
                <div class="reg_enter">
                	<a href="login">已有帐号，返回登录</a>
                </div>
            </div>
            <div class="error_tips" id="error_tips"></div>
        </div>
    </div>
</form>
<div class="footer">
	<p>&copy; 2011-2012 <a href="#">fetool</a> - <a target="_blank" href="http://www.shaman05.com">shaman</a></p>
</div>
</body>
</html>
<script type="text/javascript" src="../static/js/jquery.min.js"></script>
<script type="text/javascript" src="../static/js/fetool.lar.js"></script>