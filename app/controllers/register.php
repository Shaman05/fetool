<?php

class Register extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	function index(){
		$page['title'] = "注册 - Fetool";	
		$this -> load -> view('register.php',$page);
	}
}