/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-1
 * Time: 上午9:52
 */


var user = require('../model/user');

module.exports = {
  addUser: function(options, callback){
    var name = options.name;
    var password = options.password;
    var level = options.level;
    if(!name || !password){
      return callback('用户名或者密码不能为空!');
    }
    user.add({
      name: name,
      password: password,
      level: level || '0'
    }, function(err, user){
      callback(err ? err : null, user);
    });
  }
};