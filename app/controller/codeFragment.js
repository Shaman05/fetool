/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-17
 * Time: 下午7:57
 */

var fs = require('fs');
var _util = require('../common/util');
var __dir__ = process.execPath.replace(/(fetool|nw)\.exe/, '');
var root = 'data';
var codeMirrorConfig = 'config\\codeMirror.json';
var allowOpenFile = ['html', 'css', 'js', 'txt', 'json', 'xml', 'md', '.php', '.rb', '.py'];
var path = [root];
var configFile = __dir__ + path.concat([codeMirrorConfig]).join('\\');
var $dataDir = $('#dataDir');
var $dirLabel = $('#dirLabel');

_util.readJSON(configFile, function(data){
  codeFramePageInit(data);
});

//右键菜单
context.init({
  preventDoubleContext: false,
  compress: true
});
context.settings({

});
context.attach('[data-type=folder]', [
  {header: 'Folder'},
  {text: 'Open', action: OpenFile},
  {text: 'Delete', action: DeleteFile}
]);
context.attach('[data-type=document]', [
  {header: 'Document'},
  {text: 'Open', action: OpenFile},
  {text: 'Delete', action: DeleteFile}
]);
function OpenFile(e){
  $('a[title="' + $(this).attr('data-arg') + '"]').trigger('click');
}
function DeleteFile(e){
  var $this = $(this);
  var filePath = __dir__ + path.join('\\') + '\\' + $this.attr('data-arg');
  if(confirm('确认删除吗？')){
    _util.deleteFolderRecursive(filePath, function(){
      $('a[title="' + $this.attr('data-arg') + '"]').remove();
    });
  }
}

//页面初始化
function codeFramePageInit(config){
  var docEdit = CodeMirror.fromTextArea(document.getElementById("codeEditArea"), {
    theme: config.theme,
    lineNumbers: true,
    lineWrapping: true,
    indentUnit: 2,
    styleActiveLine: true,
    matchBrackets: true,
    readOnly: true,
    mode: 'javascript'
  });

  var codeFrame = {
    getToc: function(e, dir){
      var filePath = __dir__ + path.join('\\') + '\\' + dir;
      var extension, canOpen = false;
      if(!_util.isDir(filePath)){ //文件
        extension = filePath.split('.').pop();
        canOpen = allowOpenFile.indexOf(extension) > -1;
        canOpen && fs.readFile(filePath, 'utf8', function(err, content){
          if(err)return;
          docEdit.setValue(content);
          docEdit.refresh();
          $dataDir.find('.current').removeClass('current');
          $(e.target).addClass('current');
          $dirLabel.text([path.join('/'), dir].join('/'));
        });
      }else{ //文件夹
        !!dir && path.push(dir);
        _util.getToc(filePath, function(data){
          if(data.err){
            console.log(data.err);
            return;
          }
          var files = data.document || [];
          var folder = data.folder || [];
          var tocBuffer = [];
          $dirLabel.text(path.join('/'));
          path.length > 1 && tocBuffer.push(createBack());
          folder.length > 0 && $.each(folder, function(i, folder){
            tocBuffer.push(createLink('folder', folder));
          });
          files.length > 0 && $.each(files, function(i, file){
            tocBuffer.push(createLink('document', file));
          });
          if(tocBuffer.length === 0){
            tocBuffer.push('<div>...</div>');
          }
          $dataDir.html(tocBuffer.join(''));
        });
      }
    },
    backDir: function(e){
      path.pop();
      codeFrame.getToc(e, path.pop());
    },
    changeTheme: function(e){
      var select = $(e.target)[0];
      var theme = select.options[select.selectedIndex].innerHTML;
      docEdit.setOption("theme", theme);
      //同时将选择保存到配置
      fs.readFile(configFile, 'utf8', function(err, data){
        var content = data.replace(/"theme": ".*"/ig, '"theme": "' + theme + '"');
        fs.writeFile(configFile, content, 'utf8', function(err){
          if (err) alert('保存配置出错：' + err);
        });
      });
    }
  };

  util.eventInit(codeFrame);
  codeFrame.getToc(null, '');
}

//创建返回上一级
function createBack(){
  return '<a event-click="backDir" href="javascript:"><span class="file_icon file_backDir"></span>返回上一级</a>';
}

//创建目录链接
function createLink(type, item){
  var name = item.name;
  var suffix = type === 'document' ? name.split('.').pop() : 'folder';
  var label = name.toString().length > 12 ? name.substr(0, 10) + '...' : name;
  return '<a title="' + name + '" event-click="getToc" data-args="'
    + name + '" href="javascript:" data-type="' + type + '"><span class="file_icon file_' + suffix + '"></span>'
    + label + '</a>';
}