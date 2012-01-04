<?php
class ProjectsModel extends CI_Model{
	function __construct(){	
		parent::__construct();
		$this -> load -> database();
	}
	
	function get_all_projects(){
		$projects=array();
		$sql="select * from projects";
		$rs=mysql_query($sql);
		while($row=mysql_fetch_array($rs)){
			$projects[]=$row;
		}
		return $projects;
	}
	
	function get_project($id){
		$project=array();
		$sql="select * from projects where id='$id'";
		$rs=mysql_query($sql);
		$num=mysql_num_rows($rs);
		if($num == 0){
			echo '<div class="no_result">记录不存在!</div>';
			exit;
		}else{
			while($row=mysql_fetch_array($rs)){
				$project["id"]=$row["id"];
				$project["name"]=$row["name"];
				$project["desc"]=$row["miaoshu"];
				$project["creat_time"]=$row["creat_time"];
				$members=$row["members"];
				$project["css_path"]=$row["css_path"];
				$project["js_path"]=$row["js_path"];
				$project["html_path"]=$row["html_path"];
				$project["project_static_path"]=$row["project_static_path"];
				$project["mark"]=$row["mark"];
			}
			$project["members"]=explode(",",$members);
			return $project;
		}
	}
}
?>
