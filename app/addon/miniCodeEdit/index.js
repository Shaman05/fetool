/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/9
 * Time: 16:36
 */

'use strict';

requirejs.config({
  baseUrl: '../../',
  paths: {
    text: 'bower_components/requirejs-text/text',
    jquery: 'bower_components/jquery/dist/jquery.min',
    bootstrap: 'bower_components/bootstrap/dist/js/bootstrap.min',
    editor: 'module/editor.js',
    util: 'core/util'
  },
  shim: {
    'bootstrap': ['jquery'],
    'util': ['bootstrap']
  }
});

window.name = "NG_DEFER_BOOTSTRAP!";

requirejs(['module/main.js', 'module/menu.js', 'cm/lib/codemirror.js'], function(main, menu){
  main.init();
  menu.init();
});