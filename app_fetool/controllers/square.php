<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Square extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - 广场';
	    $d['action'] = 'square';

	    $this->load->view('template/header.html', $d);
		$this->load->view('square.html');
		$this->load->view('template/footer.html');
	}
}