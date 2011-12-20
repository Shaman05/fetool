<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>fetool 登录</title>
<link rel="stylesheet" type="text/css" href="css/fetool.login.css">
</head>

<body>
<form id="login_form" action="">
    <div class="login_wrap">
        <div class="login_box">
            <div class="login_form clearfix">
            	<h1>LOGIN</h1>
                <span class="enter">
                    <input type="text" id="name" value="输入用户名" onFocus="this.value=this.value=='输入用户名'?'':this.value" /><input type="password" id="pwd" title="这里输入密码" />
                </span>
                <span id="login_checkbox" class="login_checkbox login_checked">
                    <input type="checkbox" checked id="keep_record"><label>Keep My Information</label>
                </span>
                <input type="submit" id="login_btn" title="登录" value="LOGIN" />
            </div>
            <p>
                <a href="#" title="这里找回密码">忘记密码?</a>
                <a href="register.php" title="注册用户">注册用户</a>
                <a href="index.php" title="游客进入" target="_top">游客进入</a>
            </p>
            <div class="error_tips" id="error_tips"></div>
        </div>
    </div>
</form>
</body>
</html>