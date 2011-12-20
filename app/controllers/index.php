<?php

class Index extends CI_Controller {
	function __construct(){
		parent::__construct();
	}
	
	public function index(){
		$page['title'] = "欢迎使用前端助手 - Fetool";
		
		session_start();
		if(isset($_SESSION['user'])){
			$page['isLogin'] = true;
			$page['user'] = $_SESSION['user'];
			$this -> load -> model('MymoduleModel'); 
			$arr = $this -> MymoduleModel -> get_module_name(); //左部-模块导航菜单
			$page['module_author'] = $arr['module_author'];
			$page['module_name'] = $arr['module_name'];
			$page['module_type'] = $arr['module_type'];
			$page['module_num'] = $arr['module_num'];
			$page['module_list'] = $this -> MymoduleModel -> get_member_modules(); //内容-模块详细列表
		}else{
			$page['isLogin']=false;
			$this -> load -> model('ModulesModel'); 
			$arr = $this -> ModulesModel -> get_module_name(); //左部-模块导航菜单
			$page['module_name'] = $arr['module_name'];
			$page['module_type'] = $arr['module_type'];
			$page['module_num'] = $arr['module_num'];
			$page['module_list'] = $this -> ModulesModel -> get_all_modules(); //内容-模块详细列表
			//header("Location:index.php/login");
		}
		
		$this->load->view('index.php',$page);
	}
}