<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class JsModule extends CI_Controller {

	public function index()
	{
	    $d = array();
	    $d['title'] = '前端助手 - Js模块';
	    $d['action'] = 'jsModule';

	    $this->load->view('template/header.html', $d);
		$this->load->view('jsModule.html');
		$this->load->view('template/footer.html');
	}
}