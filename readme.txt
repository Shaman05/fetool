前端助手安装：
1.下载fetool后，在mysql中建立一个空数据库'fetool'
  将fetool.sql导入mysql中
2.修改以下文件配置 app/config/database.php
  $db['default']['hostname'] = '主机地址';
  $db['default']['username'] = 'mysql用户名';
  $db['default']['password'] = 'mysql登录密码';
  $db['default']['database'] = '步骤1中新建的数据库名:fetool';

前端助手使用说明：
