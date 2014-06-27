/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-17
 * Time: 下午7:57
 */

(function(){
  'use strict';
  var fs = require('fs');
  var _util = require('../common/util');
  var __dir__ = process.execPath.replace(/(fetool|nw)\.exe/, '');
  var root = 'data';
  var codeMirrorConfig = 'config\\codeMirror.json';
  var path = [root];
  var configFile = __dir__ + path.concat([codeMirrorConfig]).join('\\');
  var allowOpenFile = ['html', 'css', 'js', 'txt', 'json', 'xml', 'md', 'php', 'rb', 'py', 'sass', 'scss', 'java', 'jade', 'sh', 'coffee', 'ts', 'txt', 'gitignore'];
  var mixedMode = {
    name: "htmlmixed",
    scriptTypes: [
      {
        matches: /\/x-handlebars-template|\/x-mustache/i,
        mode: null
      },
      {
        matches: /(text|application)\/(x-)?vb(a|script)/i,
        mode: "vbscript"}
    ]
  };
  var modeMap = {
    html: mixedMode,
    js: 'text/javascript',
    css: 'text/css',
    json: 'application/json',
    xml: 'application/xml',
    md: 'text/x-markdown',
    php: 'php',
    rb: 'text/x-ruby',
    py: 'text/x-python',
    less: 'text/x-less',
    scss: 'text/x-sass',
    sass: 'text/x-sass',
    sh: 'text/x-sh',
    java: 'text/x-java',
    cs: 'text/x-csharp',
    jade: 'text/x-jade',
    coffee: 'text/x-coffeescript',
    ts: 'application/typescript'
  };
  var $dataDir = $('#dataDir');
  var $dirLabel = $('#dirLabel');
  var docEdit;
  var currentEditFile;
  var isSaving = false;

  _util.readJSON(configFile, function(data){
    codeFramePageInit(data);
  });

  //右键菜单
  context.init({
    preventDoubleContext: false,
    compress: true
  });
  context.attach('[data-type]', [
    {header: 'Options'},
    {text: 'Open', action: OpenFile},
    {text: 'Delete', action: DeleteFile}
  ]);
  context.attach('#dataDir', [
    {header: 'New'},
    {text: 'File', action: NewFile},
    {text: 'Directory', action: NewDirectory}
  ]);
  function OpenFile(){
    $dataDir.find('.context-temp-hover').removeClass('context-temp-hover');
    $('a[title="' + $(this).attr('data-arg') + '"]').trigger('click');
  }
  function DeleteFile(){
    var $this = $(this);
    var filePath = __dir__ + path.join('\\') + '\\' + $this.attr('data-arg');
    if(confirm('确认删除吗？')){
      _util.deleteFolderRecursive(filePath, function(){
        $('a[title="' + $this.attr('data-arg') + '"]').remove();
      });
    }else{
      $dataDir.find('.context-temp-hover').removeClass('context-temp-hover');
    }
  }
  function NewFile(){
    $('.dropdown-context').fadeOut(300);
    setTimeout(function(){
      var fileName = prompt("请输入文件名称:");
      var filePath = __dir__ + path.join('\\') + '\\' + fileName;
      if(!fileName)return;
      if(!/.*\..*/.test(fileName)){
        alert('文件名不合法!');
        NewFile();
      }else{
        if(fs.existsSync(filePath)){
          if(confirm('该文件已存在，要覆盖吗？')){
            _util.createNewFile(filePath, function(data){
              if(!data.boolen){
                alert(data.message);
              }else{
                $dataDir.find('[title="' + fileName + '"]').trigger('click');
              }
            });
          }
        }else{
          _util.createNewFile(filePath, function(data){
            if(!data.boolen){
              alert(data.message);
            }else{
              $dataDir.append(createLink('document', {name: fileName}));
              $dataDir.find('[title="' + fileName + '"]').trigger('click');
            }
          });
        }
      }
    }, 10);
  }
  function NewDirectory(){
    $('.dropdown-context').fadeOut(300);
    setTimeout(function(){
      var fileName = prompt("请输入文件夹名称:");
      var filePath = __dir__ + path.join('\\') + '\\' + fileName;
      if(!/^[^\.].*/.test($.trim(fileName))){
        alert('文件名不合法!');
        NewFile();
      }else{
        if(fs.existsSync(filePath)){
          alert('该文件夹或文件已存在!');
        }else{
          _util.createNewFolder(filePath, function(data){
            if(!data.boolen){
              alert(data.message);
            }else{
              if($dataDir.find('[data-type="document"]').size() == 0){
                $dataDir.append(createLink('folder', {name: fileName}));
              }else{
                $(createLink('folder', {name: fileName})).insertBefore($dataDir.find('[data-type="document"]').eq(0));
              }
            }
          });
        }
      }
    }, 10);
  }

  //页面初始化
  function codeFramePageInit(config){
    docEdit = CodeMirror.fromTextArea(document.getElementById("codeEditArea"), {
      theme: config.theme,
      lineNumbers: true,
      lineWrapping: true,
      indentUnit: 2,
      styleActiveLine: true,
      matchBrackets: true,
      readOnly: true,
      mode: modeMap['md']
    });

    var codeFrame = {
      getToc: function(e, dir){
        var filePath = __dir__ + path.join('\\') + '\\' + dir;
        var extension, canOpen = false;
        $('.dropdown-context').fadeOut(300);
        $dataDir.find('.context-temp-hover').removeClass('context-temp-hover');
        if(!_util.isDir(filePath)){ //文件
          extension = filePath.split('.').pop();
          canOpen = allowOpenFile.indexOf(extension) > -1;
          canOpen && fs.readFile(filePath, 'utf8', function(err, content){
            if(err){
              alert(err);
              return;
            }
            openEditIde(content, extension, function(){
              currentEditFile = filePath;
              $dataDir.find('.current').removeClass('current');
              $(e.target).addClass('current');
              $dirLabel.text([path.join('/'), dir].join('/'));
            });
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
      },
      saveFile: function(e){ //异步保存文件
        var content = docEdit.getValue();
        if(!isSaving && currentEditFile){
          isSaving = true;
          fs.writeFile(currentEditFile, content, function(err){
            isSaving = false;
            alert(err || '保存成功!');
          });
        }
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

  //点击文件打开编辑器
  function openEditIde(content, extension, callback){
    $('.CodeMirror-wrap').remove();
    _util.readJSON(configFile, function(data){
      docEdit = CodeMirror.fromTextArea(document.getElementById("codeEditArea"), {
        theme: data.theme,
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        styleActiveLine: true,
        matchBrackets: true,
        mode: modeMap[extension] || 'text'
      });
      docEdit.setValue(content);
      callback && setTimeout(function(){
        callback();
      }, 200);
    });
  }
})();