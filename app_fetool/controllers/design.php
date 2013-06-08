<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Design extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - 设计';
	    $d['action'] = 'design';

	    $this->load->view('template/header.html', $d);
		$this->load->view('design.html');
		$this->load->view('template/footer.html');
	}
}