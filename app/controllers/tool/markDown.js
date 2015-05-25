/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/5
 * Time: 17:31
 */

define([], function(){

  'use strict';

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    $scope.currentPage = 'Markdown编译器';

    var $comBtn = $('#com_btn');
    var $realTimePreview = $("#realtime-preview");

    var editor1 = CodeMirror.fromTextArea(document.getElementById("markdownCode"), {
      mode: "markdown",
      lineNumbers: true,
      lineWrapping: true
    });
    editor1.on("change", function (Editor, changes) {
      $scope.compile();
    });

    var editor2 = CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
      mode: "text/html",
      lineNumbers: true,
      lineWrapping: true,
      readOnly: true
    });

    $scope.compile = function(){
      var markdown = editor1.getValue();
      $comBtn.button("loading");
      var converter = new Markdown.Converter();
      var html = converter.makeHtml(markdown);
      editor2.setValue(html);
      $comBtn.button("reset");
      $realTimePreview.html(html);
    };

    $scope.realTimeShow = false;
    $scope.toggleRealTimeShow = function(){
      $scope.realTimeShow = !$scope.realTimeShow;
    };

    $scope.$apply();
  }];

});