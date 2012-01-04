<?php
class Module_block extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	
	function show_block($id){
		$block=array();
		$block['title']="fetool - 单独模块";
		
		$this -> load -> model('ModulesModel');
		$block['module_html_css'] = $this -> ModulesModel -> get_module_html_css($id); //内容-模块详细列表
		
		$this -> load -> view('module_block.php',$block);
	}
	
	function show_block_scale($id){
		$block=array();
		$block['title']="fetool - 单独模块";
		
		$this -> load -> model('ModulesModel');
		$block['module_html_css'] = $this -> ModulesModel -> get_module_html_css($id); //内容-模块详细列表
		
		$this -> load -> view('module_block_scale.php',$block);
	}
}
?>