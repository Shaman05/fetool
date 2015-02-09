var newButton, openButton, saveButton, closeBtn, minBtn;
var editor;
var fileEntry;
var hasWriteAccess;
var isSaved = true;

+(function(){
  var gui = require("nw.gui");
  var fs = require("fs");
  var conf = require("./conf/app.conf");

  var $editor = document.getElementById("editor");
  var $title = document.getElementById("title");
  var $mode = document.getElementById("mode");

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
    handleDocumentChange(null);
  }

  function setFile(theFileEntry, isWritable) {
    fileEntry = theFileEntry;
    hasWriteAccess = isWritable;
  }

  function readFileIntoEditor(theFileEntry) {
    fs.readFile(theFileEntry, 'utf8', function (err, data) {
      if (err) {
        console.log("Read failed: " + err);
      }
      handleDocumentChange(theFileEntry);
      editor.setValue(String(data));
    });
  }

  function writeEditorToFile(theFileEntry) {
    fs.writeFile(theFileEntry, editor.getValue(), 'utf8', function (err) {
      if (err) {
        console.log("Write failed: " + err);
        return;
      }
      handleDocumentChange(theFileEntry);
      console.log("Write completed.");
    });
  }

  var onChosenFileToOpen = function(theFileEntry) {
    setFile(theFileEntry, false);
    readFileIntoEditor(theFileEntry);
  };

  var onChosenFileToSave = function(theFileEntry) {
    setFile(theFileEntry, true);
    writeEditorToFile(theFileEntry);
  };

  function handleNewButton() {
    if (false) {
      newFile();
      editor.setValue("");
    } else {
      /*var x = window.screenX + 10;
       var y = window.screenY + 10;*/
      gui.Window.open('main.html', {
        "width": 800,
        "height": 520,
        "show": false,
        "title": "Mini Code Editor",
        "frame": conf.frame,
        "toolbar": conf.toolbar,
        "icon": "app/images/logo.png"
      });
    }
  }

  function handleOpenButton() {
    if(!isSaved){
      if(window.confirm('尚未保存，继续吗？')){
        $("#openFile").trigger("click");
      }
    }
  }

  function handleSaveButton() {
    if (fileEntry && hasWriteAccess) {
      writeEditorToFile(fileEntry);
    } else {
      $("#saveFile").trigger("click");
    }
  }

  onload = function() {
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

    editor = new CodeMirror($editor, {
      mode: {
        name: "javascript",
        json: true
      },
      lineNumbers: true,
      theme: conf.codeTheme,
      extraKeys: {
        "Cmd-S": function(instance) { handleSaveButton() },
        "Ctrl-S": function(instance) { handleSaveButton() }
      }
    });

    newFile();
    onresize();

    gui.Window.get().show();
  };

  onresize = function() {
    var containerWidth = $editor.offsetWidth;
    var containerHeight = $editor.offsetHeight;
    var scrollerElement = editor.getScrollerElement();
    scrollerElement.style.width = containerWidth + 'px';
    scrollerElement.style.height = containerHeight + 'px';
    editor.refresh();
  }
}());