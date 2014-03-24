/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-17
 * Time: 下午3:54
 *
 * controller目录下的模块为页面对应的应用模块
 * 注意：在添加依赖的时候，当前路径为页面的所在路径
 */

var util = require('../common/util');
var ejs = require('../../lib/node_modules/ejs');

var mongoose = require('../../lib/node_modules/mongoose');
var user = require('../service/user');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

  user.getUserList({}, function(err, users){
    var $container = $('.userList');
    var tpl = $('#userList').html();
    var html = ejs.render(tpl, {users: users});
    $container.html(html);

    var ObjectId = mongoose.Types.ObjectId;
    user.getUserInfo(ObjectId.fromString($('.oid:eq(0)').text()), function(err, userInfo){
      var $container = $('.userInfo');
      var tpl = $('#userInfo').html();
      var html = ejs.render(tpl, {userInfo: userInfo});
      $container.html(html);
    });
  });

});