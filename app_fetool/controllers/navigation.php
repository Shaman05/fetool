<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Navigation extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - 导航';
	    $d['action'] = 'navigation';

	    $this->load->view('template/header.html', $d);
		$this->load->view('navigation.html');
		$this->load->view('template/footer.html');
	}
}