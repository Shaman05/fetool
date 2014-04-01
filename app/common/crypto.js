/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-4-1
 * Time: 上午10:27
 */

var crypto = require('crypto');

module.exports = {
  md5: function(text){
    return crypto.createHash('md5').update(text).digest('hex');
  }
};