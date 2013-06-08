/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 6/8/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

;(function(){
    var libPath = '../codemirror-3.13/lib/';
    var modePath = '../codemirror-3.13/mode/';

    seajs.config({

        base: 'fe-script/',

        alias: {
            'jquery': './static/jquery/jquery-1.7.2.min.js',
            'codemirror': libPath + 'codemirror.js',
            'codemirror-css': libPath + 'codemirror.css',
            'xml': modePath + 'xml/xml.js',
            'javascript': modePath + 'javascript/javascript.js',
            'css': modePath + 'css/css.js',
            'htmlmixed': modePath + 'htmlmixed/htmlmixed.js'
        },

        preload: ['jquery']
    });
})();
