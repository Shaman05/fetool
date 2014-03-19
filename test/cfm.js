/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-14
 * Time: 下午3:54
 */

var mongoose = require('../lib/node_modules/mongoose');
var cfm = require('../model/cfm');

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  var item = cfm.create({
    title: '测试碎片',
    heat: 188,
    html: '<div>标题</div><p>内容</p>'
  });
  cfm.save(item, function(err, item){
    !err && console.log(item);
  });
});