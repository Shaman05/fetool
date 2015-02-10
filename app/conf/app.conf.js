/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/3
 * Time: 14:47
 */

var path = require('path');

module.exports = {
  data_path: function(){
    return __dirname;
  },

  conf_file: function(){
    return path.join(__dirname, 'app.conf.js');
  },

  frame: false,

  toolbar: true,

  supportFile: ['html', 'css', 'js', 'txt', 'json', 'xml', 'md', 'php', 'rb', 'py', 'sass', 'scss', 'java', 'jade', 'sh', 'coffee', 'ts', 'txt', 'gitignore'],

  codeThemes: ["lesser-dark", "ambiance", "blackboard", "cobalt", "eclipse", "elegant", "erlang-dark", "monokai", "neat", "night", "rubyblue", "xq-dark"],

  codeTheme: "monokai"
};