<?php

class Login extends CI_Controller{
	function __construct(){
		parent::__construct();
	}
	function index(){
		//清除user
		session_start();
		unset($_SESSION['user']);
		
		$page['title'] = "登录 - Fetool";	
		$this -> load -> view('login.php',$page);
	}
}