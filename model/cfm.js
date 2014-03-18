/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-18
 * Time: 下午2:55
 */

var factory = require('../model/interface');

var fields = ['title', 'category', 'html', 'css', 'js', 'tag', 'heat', 'createTime'];

var methods = {};

module.exports = factory.createModel({
  name: 'cfm', //这里的名称需存在于schema里
  fields: fields,
  methods: methods
});