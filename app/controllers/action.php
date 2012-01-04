<?php
/*
 * acrion.php
 * 异步请求处理页
 */
class Action extends CI_Controller{
	function __construct(){
		parent::__construct();
		$this -> load -> database();
		$this -> load -> helper('url');
	}
	
	function index(){
		$action=isset($_POST["action"])?$_POST["action"]:$_GET["action"]; //获取请求操作类型
		$reg="/<script.*?>(\s|.)*?<\/script>/i";  //脚本过滤表达式
		switch($action){
			case "login":    //登录验证
				$name=$_GET["name"];
				$pwd=$_GET["pwd"];
				$sql="select * from user where name='$name'";
				$result=mysql_query($sql);
				$num=mysql_num_rows($result);
				$login=array();
				if($num==0){
					$login["statu"]=false;
					$login["message"]="用户名不存在！";
				}else{
					while($row=mysql_fetch_array($result))
					{
						if(md5($pwd)==$row["pwd"]){
							session_start();
							$_SESSION["user"]=$name;
							$login["statu"]=true;
							$login["message"]="登录成功！";
							$login["siteUrl"]="../";
						}else{
							$login["statu"]=false;
							$login["message"]="密码错误！";
						}
					}
				}
				echo json_encode($login);
				break;
				
			case "check_name":     //注册名检测
				$regname=$_GET["regname"];
				if($regname==""){
					echo "0|用户名不能为空！";
				}else{
					$sql="select name from user";
					$result=mysql_query($sql);
					$test=array();
					while($row=mysql_fetch_array($result)){
						$test[]=$row["name"];
					}
					if(in_array($regname,$test)){
						echo "0|对不起，此用户名已经注册！";
					}else{
						echo "1|恭喜，您可以使用此名字。";
					}
				}
				break;
				
			case "register":     //注册
				$name=$_GET["name"];
				$pwd=md5($_GET["pwd"]);
				$email=$_GET["email"];
				$sql="select * from user where name='$name'";
				$result=mysql_query($sql);
				$num=mysql_num_rows($result);
				if(!$num){
					$sql="insert into user(name,pwd,email) values('$name','$pwd','$email')";
					if(mysql_query($sql)){
						session_start();
						$_SESSION['user']=$name;
						echo "success";
					}else{
						echo "注册失败！请尝试刷新重新注册！";
					}
				}else{
					echo "对不起，此用户名已经注册！";
				}
				break;
				
			case "get_module_code":     //获取模块html和css(json返回)  -  编辑器使用
				$modId=$_GET["module_id"];
				$sql="select * from modules where id='$modId'";
				$result=mysql_query($sql);
				$arr=array();
				while($row=mysql_fetch_array($result)){
					$arr['html_code']=$row["html"];
					$arr['css_code']=$row["css"];
				}
				echo json_encode($arr);
				break;
				
			case "update_module":     //更新模块html css  -  个人模块修改操作
				$modId=$_POST["modId"];
				$html=$_POST["html"];
				$css=$_POST["css"];
				$html=preg_replace($reg,'',$html);    //过滤脚本
				$css=preg_replace($reg,'',$css);
				$sql="update modules set html='$html',css='$css' where id='$modId'";
				if(mysql_query($sql)){
					echo "success";
				}else{
					echo "error";
				}
				break;
			
			case "get_class":     //获取所有模块类名(json返回)  -  新增扩展模块操作
				$sql="select name,style from modules order by name asc";
				$result=mysql_query($sql);
				$mType=array();
				$mstyle=array();
				while($row=mysql_fetch_array($result)){
					$mType[]=$row["name"];
					$mstyle[]=$row["style"];
				}
				$arr=array();
				$arr_type=array();
				$json=array();
				$json[$mType[0]]=$mstyle[0];
				$arr[0]=$mType[0];
				$arr_type[0]=$mstyle[0];
				for($n=0; $n < sizeof($mType); $n++){
					foreach($arr as $val){
						if(!is_int(array_search($mType[$n],$arr))){ //对不同类名的模块将其压栈
							$arr[]=$mType[$n];
							$arr_type[]=$mstyle[$n];
							$json[$mType[$n]]=$mstyle[$n];
						}
					}
				}
				echo json_encode($json);
				break;
				 
			case "add_module":    //新增模块提交
				session_start();
				$author=$_SESSION["user"];
				$html=$_POST["htmlCode"];
				$css=$_POST["cssCode"];
				$html=preg_replace($reg,'',$html);    //过滤脚本
				
				$type=$_POST["type"];
				if($type == "add_base"){   //新增基类
					$baseName=$_POST["baseName"];
					$add_type=$_POST["add_type"];
					$sql="insert into modules (name,html,css,author,style,module_type) values ('$baseName','$html','$css','$author','$add_type','0')";
				}elseif($type == "add_extend"){  //新增扩展类
					$baseClass=$_POST["baseClass"];
					$s=mysql_query("select style from modules where name='$baseClass' and module_type='0'");
					while($row=mysql_fetch_array($s)){
						$style=$row["style"];
					}
					$sql="insert into modules (name,html,css,author,style,module_type) values ('$baseClass','$html','$css','$author','$style','1')";
				}
				if(mysql_query($sql)){
					echo "添加成功";
				}else{
					echo "添加失败";
				}
				break;
				
			case "getModule":    //获取单一模块
				$id=$_GET["id"];
				$sql="select html,css from modules where id='$id'";
				$module=array();
				$result=mysql_query($sql);
				if(mysql_num_rows($result)){
					$module["statu"]=true;
					while($row=mysql_fetch_array($result)){
						$module["html"]=$row["html"];
						$module["css"]=$row["css"];
					}
				}else{
					$module["statu"]=false;
				}
				echo json_encode($module);
				break;
			
			case "delete_module":    //删除模块
				$id=$_GET["modId"];
				$sql="delete from modules where id='$id'";
				$delInfo=array();
				if(mysql_query($sql)){
					$delInfo["statu"]=true;
					$delInfo["message"]="删除成功！";
				}else{
					$delInfo["statu"]=false;
					$delInfo["message"]="删除失败 :(";
				}
				echo json_encode($delInfo);
				break;
				
			case "delete_project":  //删除项目	
				$id=$_GET["pid"];
				$sql="delete from projects where id='$id'";
				$delInfo=array();
				if(mysql_query($sql)){
					$delInfo["statu"]=true;
					$delInfo["message"]="删除成功！";
				}else{
					$delInfo["statu"]=false;
					$delInfo["message"]="删除失败 :(";
				}
				echo json_encode($delInfo);
				break;
				
			case "get_all_users":  //获取所有用户
				$users=array();
				$temp=array();
				$sql="select * from user";
				$rs=mysql_query($sql);
				while($row=mysql_fetch_array($rs)){
					$temp["id"]=$row["id"];
					$temp["name"]=$row["name"];
					array_push($users,$temp);
				}
				echo json_encode($users);
				break;
			
			case "edit_project":
				$id=$_GET["id"];
				$name=$_GET["name"];
				$desc=$_GET["desc"];
				$members=$_GET["members"];
				$css_path=$_GET["css_path"];
				$js_path=$_GET["js_path"];
				$html_path=$_GET["html_path"];
				$project_static_path=$_GET["project_static_path"];
				$mark=$_GET["mark"];
				if(!!$id){
					$sql="update projects set name='$name',miaoshu='$desc',members='$members',css_path='$css_path',js_path='$js_path',html_path='$html_path',project_static_path='$project_static_path',mark='$mark' where id='$id'";
				}else{
					$sql="insert into projects (name,miaoshu,members,css_path,js_path,html_path,project_static_path,mark) values ('$name','$desc','$members','$css_path','$js_path','$html_path','$project_static_path','$mark')";
				}
				if(mysql_query($sql)){
					echo ":)  操作成功！";
				}else{
					echo ":(  操作失败！";
				}
				break;
				
			default:
				echo "缺少参数 或者 错误的参数类型！";
				break;
		}
	}
}

/*end*/