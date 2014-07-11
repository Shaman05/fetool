/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-7-11
 * Time: 上午10:55
 */

(function(){
  'use strict';

  var markdownEditor, htmlEditor;
  var $compileBtn = $('[data-compiling]');
  var $realView = $("#realtime-preview");
  var page = {
    init: function(){
      markdownEditor = CodeMirror.fromTextArea(document.getElementById("markdownCode"), {
        mode: "markdown",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        styleActiveLine: true,
        matchBrackets: true,
        theme: 'monokai',
        onChange:function(){
          page.compileCode();
        }
      });
      htmlEditor = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
        mode: "text/html",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        styleActiveLine: true,
        matchBrackets: true,
        readOnly: true,
        theme: 'monokai'
      });

    },
    compileCode: function(){
      var $this = $(this);
      var markdownCode = markdownEditor.getValue();
      if(!markdownCode || $this.attr('data-compiling') == '1')return;
      $this.attr('data-compiling', '1').text('编译中...');
      var converter = new Markdown.Converter();
      var html = converter.makeHtml(markdownCode);
      htmlEditor.setValue(html);
      resetCompileBtn();
      $realView.html(html);
    }
  };
  page.init();
  util.eventInit(page);

  function resetCompileBtn(){
    $compileBtn.html('<span class="glyphicon glyphicon-chevron-right"></span> HTML').attr('data-compiling', 0);
  }

})();