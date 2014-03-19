/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-14
 * Time: 下午3:54
 */

var mongoose = require('../lib/node_modules/mongoose');
var user = require('../model/user');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

  var name = 'chenchao';
  var pwd = 'abcd1234';
  /*user.collection.find({name: name}, function(err, users){
    if(users.length > 0){
      console.log('创建失败：该用户名已经存在！');
    }else{
      var shaman = user.create(name, pwd);
      user.save(shaman, function(err, user){
        !err && user.speak();
      });
    }
  });*/
  var shaman = user.create({
    name: name,
    password: pwd,
    level: 10
  });
  user.save(shaman, function(err, user){
//    !err && user.speak();
    !err && console.log(user);
  });
});