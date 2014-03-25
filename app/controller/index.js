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
var ejs = require('../node_modules/ejs');

var mongoose = require('../node_modules/mongoose');
var user = require('../model/user');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

});