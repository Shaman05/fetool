/*
 * fetool
 * action : login & register
 *
 */
;$(function(){
	var s=window.localStorage;
	$("#login_form").submit(function(){  //登录
		var _name=$("#name").val(),
			_pwd=$("#pwd").val();
		$.getJSON("action",{action:"login",name:_name,pwd:_pwd},function(data){
			if(data.statu){
				s.setItem("isLogin",true);
				window.top.location.href=data.siteUrl;
			}else{
				$("#error_tips").text(data.message).fadeIn(300);
				$(".enter").addClass("error");
			}
		});
		return false;
	})
	$("#reg_name").blur(function(){   //注册名检验
		$.get("action?action=check_name&regname="+$(this).val(),function(msg){
			var status=msg.split("|")[0],
				message=msg.split("|")[1];
			if(status=='1'){
				$("#error_tips").text(message).fadeIn(300);
				$("#reg_name").removeClass("reg_error");
			}else{
				$("#error_tips").text(message).fadeIn(300);
				$("#reg_name").addClass("reg_error");
			}
		})
	})
	$("#register_form").submit(function(){   //提交注册
        var _name=$("#reg_name").val(),
            _pwd=$("#pwd").val();
			_email=$("#email").val();
		if(_name!="" && _pwd!=""){
			$.get("action?action=register&name="+_name+"&pwd="+_pwd+"&email="+_email,function(msg){
				if(msg=='success'){
					$("#error_tips").text("恭喜注册成功！").fadeIn(300);
					$(".txt").removeClass("reg_error");
				}else{
					$("#error_tips").text(msg).fadeIn(300);
					$("#reg_name").addClass("reg_error");
				}
			});
		}else{
			$(".txt").removeClass("reg_error");
			if(_name=="" && _pwd==""){
				$("#error_tips").text("用户名和密码不能为空！").fadeIn(300);
				$("#reg_name,#pwd").addClass("reg_error");
			}else if(_name==""){
				$("#error_tips").text("用户名不能为空！").fadeIn(300);
				$("#reg_name").addClass("reg_error");
			}else if(_pwd==""){
				$("#error_tips").text("密码不能为空！").fadeIn(300);
				$("#pwd").addClass("reg_error");
			}
		}
        return false;
    })
})