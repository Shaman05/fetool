<?php

class Project extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this -> load -> model('ProjectsModel');
	}
	
	function index(){
		
	}
	
	function details($id){
		$page['project'] = $this -> ProjectsModel -> get_project($id);
		$this->load->view('project_details.php',$page);
	}
	
	function management($action="modify",$id=NULL){
		if($action == "add"){
			$page["isEdit"]=false;
			$this->load->view('project_edit.php',$page);
		}elseif($action == "edit" && $id!=NULL){
			$page["isEdit"]=true;
			$sql="select * from projects where id='$id'";
			$rs=mysql_query($sql);
			$row=mysql_fetch_array($rs);
			$page["id"]=$row["id"];
			$page["name"]=$row["name"];
			$page["desc"]=$row["miaoshu"];
			$page["members"]=explode(",",$row["members"]);
			$page["css_path"]=$row["css_path"];
			$page["js_path"]=$row["js_path"];
			$page["html_path"]=$row["html_path"];
			$page["project_static_path"]=$row["project_static_path"];
			$page["mark"]=$row["mark"];
			$this->load->view('project_edit.php',$page);
		}else{
			$page['project'] = $this -> ProjectsModel -> get_all_projects();
			$this->load->view('project_list.php',$page);
		}
	}
}