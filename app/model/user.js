/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-14
 * Time: 下午3:25
 */

var factory = require('./interface');

var methods = {
  speak: function(){
    console.log('嗨,我是' + (this.name ? this.name : '来自火星的人'));
  }
};

module.exports = factory.createModel({
  name: 'user', //这里的名称需存在于schema里
  methods: methods
});