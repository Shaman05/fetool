/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-14
 * Time: 下午2:58
 */

var mongoose = require('../../lib/node_modules/mongoose');
var Schema = mongoose.Schema;

module.exports = {

  /**
   * 代码碎片
   * @returns {Schema}
   */
  cfm: function(){
    return new Schema({
      title: {type: String, default: '未标题'}
      , category: {type: Number, default: 4}  //分类 1:html 2:css 3:js 4:其他
      , html: String
      , css: String
      , js: String
      , tag: String
      , heat: {type: Number, default: 0}
      , createTime: {type: Date, default: Date.now}
    });
  },

  /**
   * 用户
   * @returns {Schema}
   */
  user: function(){
    return new Schema({
      name: String
      , password: String
      , createTime: {type: Date, default: Date.now}
      , level: {type: Number, default: 1}
      , usable: {type: Boolean, default: true}
    });
  }

};