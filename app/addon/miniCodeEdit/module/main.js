/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/9
 * Time: 16:59
 */

define([
  'util',
  '../cm/mode/css/css.js',
  '../cm/mode/xml/xml.js',
  '../cm/mode/javascript/javascript.js',
  '../cm/mode/htmlmixed/htmlmixed.js'
], function(util){

  'use strict';

  var gui = require("nw.gui");
  var fs = require("fs");
  var conf = require("./conf/app.conf");
  var file_path = util.getParams().file;
  var editor = null;
  var newButton, openButton, saveButton, closeBtn, minBtn;
  var fileEntry;
  var hasWriteAccess;

  var $editor = document.getElementById("editor");
  var $title = document.getElementById("title");
  var $mode = document.getElementById("mode");

  util.dialog({
    content: '确认删除吗？',
    onOk: function(){
      alert('yes!');
    }
  });

  function handleDocumentChange(title) {
    var mode = "javascript";
    var modeName = "JavaScript";
    if (title) {
      title = title.match(/[^/]+$/)[0];
      if (title.match(/.json$/)) {
        mode = {name: "javascript", json: true};
        modeName = "JavaScript (JSON)";
      }
      if (title.match(/.html$/)) {
        mode = "htmlmixed";
        modeName = "HTML";
      }
      if (title.match(/.css$/)) {
        mode = "css";
        modeName = "CSS";
      }
      $title.innerHTML = title;
    } else {
      $title.innerHTML = "[no document loaded]";
    }
    editor.setOption("mode", mode);
    $mode.innerHTML = modeName;
  }

  function newFile() {
    fileEntry = null;
    hasWriteAccess = false;
    handleDocumentChange(fileEntry);
  }

  function setFile(theFileEntry, isWritable) {
    fileEntry = theFileEntry;
    hasWriteAccess = isWritable;
  }

  function readFileIntoEditor(theFileEntry) {
    fs.readFile(theFileEntry, 'utf8', function (err, data) {
      if(err){
        util.error("Read failed: " + err);
      }
      handleDocumentChange(theFileEntry);
      editor.setValue(String(data));
    });
  }

  function writeEditorToFile(theFileEntry) {
    fs.writeFile(theFileEntry, editor.getValue(), 'utf8', function (err) {
      if(err){
        util.error("Write failed: " + err);
        return;
      }
      handleDocumentChange(theFileEntry);
      util.success("Write completed.");
    });
  }

  function onChosenFileToOpen(theFileEntry) {
    var fileName = decodeURIComponent(theFileEntry);
    if(util.isSupportFile(fileName)){
      setFile(fileName, false);
      readFileIntoEditor(fileName);
    }
  }

  function onChosenFileToSave(theFileEntry) {
    setFile(theFileEntry, true);
    writeEditorToFile(theFileEntry);
  }

  function handleNewButton() {
    util.openEdit(null, true);
  }

  function handleOpenButton() {
    $("#openFile").trigger("click");
  }

  function handleSaveButton() {
    if (fileEntry && hasWriteAccess) {
      writeEditorToFile(fileEntry);
    } else {
      $("#saveFile").trigger("click");
    }
  }

  window.onresize = function() {
    var containerWidth = $editor.offsetWidth;
    var containerHeight = $editor.offsetHeight;
    var scrollerElement = editor.getScrollerElement();
    scrollerElement.style.width = containerWidth + 'px';
    scrollerElement.style.height = containerHeight + 'px';
    editor.refresh();
  };

  return {
    init: function(){
      newButton = document.getElementById("new");
      openButton = document.getElementById("open");
      saveButton = document.getElementById("save");
      closeBtn = document.getElementById("close");
      minBtn = document.getElementById("min");

      newButton.addEventListener("click", handleNewButton);
      openButton.addEventListener("click", handleOpenButton);
      saveButton.addEventListener("click", handleSaveButton);
      closeBtn.addEventListener("click", function(){
        gui.Window.get().close();
      });
      minBtn.addEventListener("click", function(){
        gui.Window.get().minimize();
      });

      $("#saveFile").change(function(evt) {
        onChosenFileToSave($(this).val());
      });
      $("#openFile").change(function(evt) {
        onChosenFileToOpen($(this).val());
      });

      editor = util.createEditor({
        dom: $editor,
        saveAction: handleSaveButton
      });

      if(file_path){
        onChosenFileToOpen(file_path);
      }else{
        newFile();
      }
      onresize();

      gui.Window.get().show();
    },
    getEditor: function(){
      return editor;
    }
  };

});