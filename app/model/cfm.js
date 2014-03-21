/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-18
 * Time: 下午2:55
 */

var factory = require('./interface');

var methods = {};

module.exports = factory.createModel({
  name: 'cfm', //这里的名称需存在于schema里
  methods: methods
});