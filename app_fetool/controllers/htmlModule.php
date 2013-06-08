<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class HtmlModule extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - Html模块';
	    $d['action'] = 'htmlModule';

	    $this->load->view('template/header.html', $d);
		$this->load->view('htmlModule.html');
		$this->load->view('template/footer.html');
	}
}