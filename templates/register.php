<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>fetool 注册</title>
<link rel="stylesheet" type="text/css" href="css/fetool.login.css">
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
                	<a href="login.php">已有帐号，返回登录</a>
                </div>
            </div>
            <div class="error_tips" id="error_tips"></div>
        </div>
    </div>
</form>
</body>
</html>