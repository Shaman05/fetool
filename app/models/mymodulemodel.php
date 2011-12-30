<?php
class MymoduleModel extends CI_Model{
	function __construct(){	
		parent::__construct();
		$this -> load -> database();
	}
	function get_module_name(){
		$user=$_SESSION['user'];
		$sql="select name from modules where author='$user'";
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
			$info['module_author']=$user;
			$info['module_name']=$arr;
			$info['module_num']=$moduleNum;
			if($arr[0]){
				$info['module_type']=sizeof($arr);
			}else{
				$info['module_type']=0;
			}
			return $info;
		}else{
			$info['module_author']=$user;
			$info['module_name']=0;
			$info['module_num']=0;
			$info['module_type']=0;
			return $info;
		}
	}
	function get_member_modules(){
		$user=$_SESSION['user'];
		$sql="select * from modules where author='$user' order by last_edit desc";
		$result=mysql_query($sql);
		$modules=array();
		while($row=mysql_fetch_array($result)){
			$modules[]=$row;
		}
		return $modules;
	}
}
?>