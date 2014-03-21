/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-19
 * Time: 下午6:07
 */

var cfm = require('../model/cfm');

module.exports = {
  /**
   * 获取代码碎片列表
   * @param condition
   * @param callback
   */
  getCfmList: function(condition, callback){
    cfm.collection.find(condition || {}, function(err, users){
      callback && callback(err, users);
    });
  },

  /**
   * 获取代码碎片信息
   * @param id
   * @param callback
   */
  getCfmInfo: function(id, callback){
    cfm.collection.findById(id, function(err, cfmInfo){
      callback && callback(err, cfmInfo);
    });
  }
};