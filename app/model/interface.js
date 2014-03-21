/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-18
 * Time: 下午3:25
 */

var mongoose = require('../../lib/node_modules/mongoose');
var schema = require('./schema');

/**
 * 抽象接口：创建数据模型
 * @param params
 * @returns {{collection: (*|Model|model|model|model|model), create: Function, save: Function}}
 */
exports.createModel = function(params){
  var name = params.name;
  var methods = params.methods;
  var Schema = schema[name]();

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  Schema.methods = methods || {};

  var Name = mongoose.model(name, Schema);

  return {
    /**
     * 集合对象
     */
    collection: Name,

    /**
     * 创建一条记录
     * @param fields
     * @returns {Name}
     */
    create: function(_fields){
      return new Name(_fields);
    },

    /**
     * 写入记录
     * @param record
     * @param callback
     */
    save: function(record, callback){
      record && record.save(function(err, _record){
        callback(err, _record);
      });
    }
  };
};