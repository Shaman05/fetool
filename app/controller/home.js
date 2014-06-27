/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-31
 * Time: 下午4:33
 */

(function(){
  'use strict';
  var fs = require('fs');
  var __dir__ = process.execPath.replace(/(fetool|nw)\.exe/, '');
  var $readme = $('#readme');
  fs.readFile(__dir__ + '//README.md', 'UTF8', function(err, content){
    if(!err){
      $readme.text(content);
    }
  });
})();