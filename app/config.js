/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-3-19
 * Time: 下午3:11
 */

module.exports = {
  db: {
    host: 'mongodb://localhost/',
    name: 'test'
  },
  data_path: function(){
    return __dirname;
  }
}