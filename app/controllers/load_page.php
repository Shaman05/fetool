<?php

class Load_page extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this -> load -> database();
	}
	
	//默认方法
	function index(){
		//$this->load->view('error_page.php');
	}
	
	//工具条
	function search_tool(){
		$this->load->view('search_tool.php');
	}
	
	function my_tool(){
		$this->load->view('my_tool.php');
	}
	
	function flatten_tool(){
		$this->load->view('flatten_tool.php');
	}
	
	//左边栏
	function project_left(){
		session_start();
		$page["user_rank"]=1;  //0-管理员 1-普通成员
		if(isset($_SESSION['user'])){
			$user=$_SESSION['user'];
			$sql="select rank from user where name='$user'";
			$rs=mysql_query($sql);
			$row=mysql_fetch_array($rs);
			$page["user_rank"]=$row["rank"];
		}
		
		$this -> load -> model('ProjectsModel');
		$page['project_list'] = $this -> ProjectsModel -> get_all_projects();
		
		$this->load->view('project_left.php',$page);
	}
	
	function module_left($type,$name=NULL){  //我的模块、模块列表、模块搜索
		session_start();
		
		if($type == "mine"){
			$this -> load -> model('MymoduleModel'); 
			$arr = $this -> MymoduleModel -> get_module_name();
			$page['module_name'] = $arr['module_name'];
		}elseif($type == "all"){
			$this -> load -> model('ModulesModel'); 
			$arr = $this -> ModulesModel -> get_module_name();
			$page['module_name'] = $arr['module_name'];
		}elseif($type == "search"){
			$this -> load -> model('ModulesModel'); 
			$arr = $this -> ModulesModel -> get_module_name($name);
			$page['module_name'] = $arr['module_name'];
		}
		
		$this->load->view('module_left.php',$page);
	}
	
	function add_module_left(){
		
		$this->load->view('add_module_left.php');
	}
	
	function flatten_left(){
		
		$this->load->view('flatten_left.php');
	}
	
	//主体内容
	function project_main(){
		$this -> load -> model('ProjectsModel');
		$page['project_list'] = $this -> ProjectsModel -> get_all_projects();
		
		$this->load->view('project_main.php',$page);
	}
	
	function my_module_main(){
		session_start();
		
		$this -> load -> model('MymoduleModel'); 
		$page['module_list'] = $this -> MymoduleModel -> get_member_modules(); //内容-模块详细列表-我的模块列表
		
		$this->load->view('my_module_main.php',$page);
	}
	
	function module_list_main($key=NULL){
		$this -> load -> model('ModulesModel');
		$page['module_list'] = $this -> ModulesModel -> get_all_modules($key); //内容-模块详细列表-搜索页
		
		$this->load->view('module_list_main.php',$page);
	}
	
	function add_module_main(){
		$this->load->view('add_module_main.php');
	}
	
	function flatten_main(){
		$this->load->view('flatten_main.php');
	}
}