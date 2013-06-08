<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Snippet extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - 代码片段';
	    $d['action'] = 'snippet';

	    $this->load->view('template/header.html', $d);
		$this->load->view('snippet.html');
		$this->load->view('template/footer.html');
	}
}