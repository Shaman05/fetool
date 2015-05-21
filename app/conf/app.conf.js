/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 14:47
 */

var path = require('path');
var pkg = require('../../package.json');

module.exports = {
  version: pkg.version,
  frame: pkg.window.frame,
  toolbar: pkg.window.toolbar,

  /**
   * 配置文件路径
   * @returns {string|*}
   */
  conf_file: function(){
    return path.join(__dirname, 'app.conf.js');
  },

  /**
   * 代码碎片保存的路径
   * @returns {string|*}
   */
  dataRoot: function(){
    return path.join(process.cwd(), 'data');
  },

  /**
   * 是否允许浏览和编辑指定的 dataRoot 目录以外的文件(!!建议不要开启)
   */
  enablePathFull: true,

  /**
   * MiniCodeEditor支持的格式
   */
  supportFile: ['html', 'css', 'js', 'txt', 'json', 'xml', 'md', 'php', 'rb', 'py', 'sass', 'scss', 'java', 'jade', 'sh', 'coffee', 'ts', 'txt', 'gitignore'],

  /**
   * MiniCodeEditor支持的主题风格
   */
  codeThemes: ["lesser-dark", "ambiance", "blackboard", "cobalt", "eclipse", "elegant", "erlang-dark", "monokai", "neat", "night", "rubyblue", "xq-dark"],

  /**
   * MiniCodeEditor当前主题
   */
  codeTheme: "monokai"
};