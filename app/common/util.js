/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-18
 * Time: 下午12:20
 */
var $ = require('../node_modules/jquery');
var fs = require('fs');

module.exports = {

  readJSON: function(filePath, callback){
    fs.readFile(filePath, function(err, data){
      if(!err){
        callback(JSON.parse(data));
      }
    });
  },

  getPubYear: function(pubtime){
    return parseInt(pubtime.split('-')[0]);
  },

  getTime: function(){
    var now = new Date();
    var year = now.getFullYear();
    var month = formatNumber(now.getMonth() + 1);
    var date = formatNumber(now.getDate());
    var h = formatNumber(now.getHours());
    var m = formatNumber(now.getMinutes());
    var s = formatNumber(now.getSeconds());
    return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s;

    function formatNumber(number){
      return number > 10 ? number : '0' + number;
    }
  },

  transformContent: function(content){
    return content.split('[[split]]').join('');
  },

  transformTags: function(tags){
    return tags.split(',');
  },

  transformSummry: function(content){
    return content.split('[[split]]')[0];
  },

  getDirSize: function(path){
    var size = 0;
    return _getDirSize(path);
    function _getDirSize(path){
      if(!fs.existsSync(path))
        return size;
      var stat = fs.lstatSync(path);
      if(stat.isDirectory()){
        var files = fs.readdirSync(path);
        files.forEach(function(file, index){
          var currentFile = path + '/'  + file;
          var stat = fs.lstatSync(currentFile);
          if(stat.isDirectory()){
            _getDirSize(currentFile);
          }else{
            size += fs.lstatSync(currentFile).size;
          }
        });
      }else{
        size += fs.lstatSync(path).size;
      }
      return size;
    }
  },

  getToc: function(dir, callback){
    var _self = this;
    var resJSON = {
      queryDir: dir,
      parentDir: dir.split('/').slice(0, -1).join('/'),
      folder: [],
      document: []
    };
    fs.readdir(dir, function(err, files){
      if(err){
        resJSON.err = err;
        callback(resJSON);
        return;
      }
      for(var i = 0, len = files.length; i < len; i++){
        var pathname = dir + "\/" + files[i];
        var stat = fs.lstatSync(pathname);
        if (!stat.isDirectory()){
          var a = files[i].split('.');
          var date = stat.atime.toLocaleDateString();
          var docSize = _self.formatSize(stat.size);
          resJSON.document.push({
            type: a[a.length-1],
            name: files[i],
            lastModfied: date,
            size: docSize
          });
        } else {
          resJSON.folder.push({
            name: files[i],
            size: '--'
          });
        }
      }
      callback(resJSON);
    });
  },

  formatSize: function(size){
    var kb = 1024;
    var mb = kb * 1024;
    var gb = mb * 1024;
    var tb = gb * 1024;
    if(size > tb){
      return p2Number(size/tb) + 'TB';
    }
    if(size > gb){
      return p2Number(size/gb) + 'GB';
    }
    if(size > mb){
      return p2Number(size/mb) + 'MB';
    }
    if(size > kb){
      return p2Number(size/kb) + 'KB';
    }
    return size + 'Bytes';
    function p2Number(num){
      return Math.ceil(num * 100)/100;
    }
  },

  log: function(text, path){
    var logFile = path || './node-blog.log';
    if(fs.existsSync(logFile)){
      fs.appendFile(path, '\n' + new Date() + ':' + text + '\n', 'utf8', function(err){
        if(err)
          throw err;
      });
    }
  },

  render: function($container, html, callback){
    util.showMask($container);
    $container.html(html);
    util.hideMask($container);
    callback && callback();
  },

  showMask: function($container){
    $container.css('position') !== 'absolute' && $container.css('position', 'relative');
    var $mask;
    var $loading = $container.find('.loading');
    if($loading.size() > 0){
      $mask = $loading;
      $mask.css('display', 'none');
    }else{
      $mask = $('<div class="maskLayer loading"></div>');
      $mask.css({
        display: 'none',
        height: $container.outerHeight(),
        width: $container.outerWidth()
      });
      $container.append($mask);
    }
    $mask.fadeIn(350);
  },

  hideMask: function($container){
    $container.find('.loading').fadeOut(350);
  }
};