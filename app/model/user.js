/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-19
 * Time: 下午3:09
 */

var user = require('./service/user');
var crypto = require('../common/crypto');

module.exports = {

  /**
   * 创建新用户
   * @param name
   * @param password
   */
  add: function(options, callback){
    var newUser = user.create({
      name: options.name,
      password: crypto.md5(options.password)
    });
    user.save(newUser, function(err, user){
      callback && callback(err, user);
    });
  },

  /**
   * 获取用户列表
   * @param condition
   * @param callback
   */
  getUserList: function(condition, callback){
    user.collection.find(condition || {}, function(err, users){
      callback && callback(err, users);
    });
  },

  /**
   * 获取用户信息
   * @param uid
   * @param callback
   */
  getUserInfo: function(uid, callback){
    user.collection.findById(uid, function(err, userInfo){
      callback && callback(err, userInfo);
    });
  }
};