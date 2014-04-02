/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-1
 * Time: 下午2:01
 */

var config = require('../config');
var mongoose = require('../node_modules/mongoose');
mongoose.connect(config.db.host + config.db.name);


module.exports = {
  connect: function(callback){
    var db = mongoose.connection;
    //db.on('error', console.error.bind(console, 'connection error:'));
    db.on('error', function(){
      callback({msg: '数据库连接失败'});
    });
    db.once('open', function(){
      //已建立连接
      callback && callback();
    });
  }
};