/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-14
 * Time: 下午3:25
 */

var mongoose = require('../lib/node_modules/mongoose');
var schema = require('./schema');
var userSchema = schema.user();

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods = {
  speak: function(){
    console.log('嗨,我是' + (this.name ? this.name : '来自火星的人'));
  }
};

var User = mongoose.model('user', userSchema);

module.exports = {
  collection: User,
  create: function(name, pwd){
    return new User({
      name: name,
      password: pwd
    });
  },
  save: function(user, callback){
    user && user.save(function(err, _user){
      callback(err, _user);
    });
  }
};