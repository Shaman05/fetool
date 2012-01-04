-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 12 月 29 日 08:57
-- 服务器版本: 5.1.53
-- PHP 版本: 5.3.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `fetool`
--

-- --------------------------------------------------------

--
-- 表的结构 `modules`
--

CREATE TABLE IF NOT EXISTS `modules` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `author` varchar(50) NOT NULL,
  `last_edit` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `css` text NOT NULL,
  `html` text NOT NULL,
  `notes` varchar(250) NOT NULL,
  `style` tinyint(1) NOT NULL DEFAULT '0' COMMENT '模块类型（0：基础模块，1：框架模块）',
  `module_type` tinyint(5) NOT NULL DEFAULT '0' COMMENT '模块种类（0：基类，1：扩展类）',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=48 ;

--
-- 转存表中的数据 `modules`
--

INSERT INTO `modules` (`id`, `name`, `author`, `last_edit`, `css`, `html`, `notes`, `style`, `module_type`) VALUES
(46, 'text_list', 'shaman', '2011-12-21 11:56:58', '', '<ul>\n	<li>fdsfsdaffsafsaf</li>\n	<li>fdsfsdaffsafsaf</li>\n</ul>', '', 0, 0),
(47, 'test', 'shaman', '2011-12-22 09:55:08', '', '<h1>test</h1>', '', 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '项目名称',
  `creat_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '项目创建时间',
  `miaoshu` varchar(200) NOT NULL COMMENT '项目描述',
  `members` varchar(500) NOT NULL COMMENT '项目成员',
  `css_path` varchar(100) NOT NULL COMMENT 'css路径',
  `js_path` varchar(100) NOT NULL COMMENT 'js路径',
  `html_path` varchar(100) NOT NULL COMMENT 'html模板路径',
  `project_static_path` varchar(100) NOT NULL COMMENT '项目模块静态路径',
  `mark` text NOT NULL COMMENT '其他',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=13 ;

--
-- 转存表中的数据 `projects`
--

INSERT INTO `projects` (`id`, `name`, `creat_time`, `miaoshu`, `members`, `css_path`, `js_path`, `html_path`, `project_static_path`, `mark`) VALUES
(2, '地方站二期', '2011-12-27 17:59:59', '地方站二期，南通等站点', 'test', 'htdocs/static/nantong/css/', 'htdocs/static/nantong/js/', 'nantong/template/', 'http://fengyun/htmls/caijing/nantong/user_template/Merge_Page.html', '静态访问方式 : <a href="http://fengyun/htmls/caijing/nantong/index.php?page=p6" target="_blank">http://fengyun/htmls/caijing/nantong/index.php?page=p6</a>'),
(12, 'test', '2011-12-29 15:42:19', '200字以内', '', 'fds', 'afd', 'dddd', 'http://www.shaman05.com', '1000字以内');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) NOT NULL,
  `pwd` varchar(64) NOT NULL,
  `email` varchar(32) NOT NULL,
  `site` varchar(50) NOT NULL,
  `rank` tinyint(1) NOT NULL DEFAULT '1' COMMENT '成员权限：0-管理员；1-普通成员',
  `flatten_cache` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `name`, `pwd`, `email`, `site`, `rank`, `flatten_cache`) VALUES
(4, 'shaman', 'b24331b1a138cde62aa1f679164fc62f', 'chenchao@cctvcjw.com', '', 0, 0),
(8, 'test', 'e10adc3949ba59abbe56e057f20f883e', '', '', 1, 0);
