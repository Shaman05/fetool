<?php
class ModulesModel extends CI_Model{
	function __construct(){	
		parent::__construct();
		$this -> load -> database();
	}
	
	function get_modules_info(){
		$arr=array();
		if(isset($_SESSION['user'])){
			$user=$_SESSION['user'];
			$sql="select * from modules where author='$user'";
			$result=mysql_query($sql);
			$num=mysql_num_rows($result); //用户模块数量
			$arr['user_modules_num']=$num;
		}
		$sql="select * from modules";
		$result=mysql_query($sql);
		$num=mysql_num_rows($result); //模块总数量
		$arr['total_modules_num']=$num;
		return $arr;
	}
	
	function get_module_name($name=NULL){
		if($name){
			$sql="select name from modules where name like '%$name%'";
		}else{
			$sql="select name from modules";
		}
		$result=mysql_query($sql);
		$moduleNum=mysql_num_rows($result);
		if($moduleNum){
			$mType=array();
			while($row=mysql_fetch_array($result)){
				$mType[]=$row["name"];
			}
			/*找出所有模块类并剔除相同类名*/
			$arr=array();
			$info=array();
			$arr[0]=$mType[0];
			for($n=0;$n<sizeof($mType);$n++){
				foreach($arr as $val){
					if(!is_int(array_search($mType[$n],$arr))){  //对不同类名的模块将其压栈
						$arr[]=$mType[$n];
					}
				}
			}
			$info['module_name']=$arr;
			$info['module_num']=$moduleNum;
			if($arr[0]){
				$info['module_type']=sizeof($arr);
			}else{
				$info['module_type']=0;
			}
			return $info;
		}
	}
	function get_all_modules($key=NULL){
		if($key){
			$search_cont=$key;
			$sql="select * from modules where name like '%$search_cont%'";
		}else{
			$sql="select * from modules order by last_edit desc";
		}
		$result=mysql_query($sql);
		$modules=array();
		while($row=mysql_fetch_array($result)){
			$modules[]=$row;
		}
		return $modules;
	}
	
	function get_module_html_css($id){   //获取单个模块信息
		$sql="select name,html,css from modules where id='$id'";
		$result=mysql_query($sql);
		$m=array();
		while($row=mysql_fetch_array($result)){
			$m['name']=$row['name'];
			$m['html']=$row['html'];
			$m['css']=$row['css'];
			$m['html_code']=trim(htmlspecialchars($m['html']));
		}
		return $m;
	}
	
	function get_block_modules(){
		$sql="select * from modules where style!='1' order by last_edit desc";
		$result=mysql_query($sql);
		$modules=array();
		while($row=mysql_fetch_array($result)){
			$modules[]=$row;
		}
		return $modules;
	}
	
	function get_frame_modules(){
		$sql="select * from modules where style='1' order by last_edit desc";
		$result=mysql_query($sql);
		$fm=array();
		while($row=mysql_fetch_array($result)){
			$fm[]=$row;
		}
		return $fm;
	}
}
?>
