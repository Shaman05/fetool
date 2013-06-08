/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 6/8/13
 * Time: 4:47 PM
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */

;define(function(require, exports, module){

    'use strict';

    require('codemirror');
    require('codemirror-css');
    require('xml');
    require('javascript');
    require('css');
    require('htmlmixed');

    module.exports = {
        init: function(){
            var delay;
            // Initialize CodeMirror editor with a nice html5 canvas demo.
            var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
                mode: 'text/html',
                tabMode: 'indent',
                lineNumbers: true
            });
            editor.on("change", function() {
                clearTimeout(delay);
                delay = setTimeout(updatePreview, 300);
            });

            function updatePreview() {
                var previewFrame = document.getElementById('preview');
                var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
                preview.open();
                preview.write(editor.getValue());
                preview.close();
            }
            setTimeout(updatePreview, 300);
        }
    };

});
