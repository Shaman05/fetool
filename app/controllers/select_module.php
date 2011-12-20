<?php

class Select_module extends CI_Controller {
	function __construct(){
		parent::__construct();
	}
	
	function index(){	
		$page['title']="选择模块";
		
		$this -> load -> model("Modulesmodel");		
		$page['modules']=$this -> Modulesmodel -> get_block_modules();
		
		$this->load->view('select_module.php',$page);
	}
}