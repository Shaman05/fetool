/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-17
 * Time: 下午7:57
 */

var fs = require('fs');
var _util = require('../common/util');
var __dir__ = process.execPath;
var root = $('#rootDir').val();
var $dirLabel = $('#dirLabel');
var path = [root];
__dir__ = __dir__.replace(/(fetool|nw)\.exe/, '');

var docEdit = CodeMirror.fromTextArea(document.getElementById("codeEditArea"), {
  lineNumbers: true,
  lineWrapping: true,
  indentUnit: 2,
  styleActiveLine: true,
  matchBrackets: true,
  mode: 'javascript'
});

var codeFrame = {
  getToc: function(e, dir){
    if(dir.indexOf('.') > 0){
      var fileName = __dir__ + path.join('\\') + '\\' + dir;
      fs.readFile(fileName, 'utf8', function(err, content){
        if(err)return;
        docEdit.setValue(content);
        docEdit.refresh();
      });
    }else{
      !!dir && path.push(dir);
      _util.getToc(__dir__ + path.join('\\'), function(data){
        if(data.err){
          console.log(data.err);
          return;
        }
        $dirLabel.text(path.join('/'));
        var files = data.document || [];
        var folder = data.folder || [];
        var tocBuffer = [];
        path.length > 1 && tocBuffer.push(createBack());
        folder.length > 0 && $.each(folder, function(i, folder){
          tocBuffer.push(createLink('folder', folder));
        });
        files.length > 0 && $.each(files, function(i, files){
          tocBuffer.push(createLink('document', files));
        });
        if(tocBuffer.length === 0){
          tocBuffer.push('<div>...</div>');
        }
        $('#dataDir').html(tocBuffer.join(''));
      });
    }
  },
  backDir: function(e){
    path.pop();
    codeFrame.getToc(e, path.pop());
  }
};

util.eventInit(codeFrame);
codeFrame.getToc(null, '');

function createBack(){
  return '<a event-click="backDir" href="javascript:"><span class="file_icon file_backDir"></span>返回上一级</a>';
}

function createLink(type, item){
  var name = item.name;
  var label = name.toString().length > 12 ? name.substr(0, 10) + '...' : name;
  return '<a title="' + name + '" event-click="getToc" data-args="'
    + name + '" href="javascript:"><span class="file_icon file_' + type + '"></span>'
    + label + '</a>';
}