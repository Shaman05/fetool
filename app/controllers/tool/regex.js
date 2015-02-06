/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 2015/2/4
 * Time: 9:17
 */

define(['util'], function(util){

  'use strict';

  var regexList = [
    {"name": "匹配中文字符", "regex": "[\\u4e00-\\u9fa5]"},
    {"name": "匹配双字节字符(包括汉字在内)", "regex": "[^\\x00-\\xff]"},
    {"name": "匹配空白行", "regex": "\\n\\s*\\r"},
    {"name": "匹配Email地址", "regex": "[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?"},
    {"name": "匹配网址URL", "regex": "[a-zA-z]+://[^\\s]*"},
    {"name": "匹配国内电话号码", "regex": "\\d{3}-\\d{8}|\\d{4}-\\{7,8}"},
    {"name": "匹配腾讯QQ号", "regex": "[1-9][0-9]{4,}"},
    {"name": "匹配中国邮政编码", "regex": "[1-9]\\d{5}(?!\\d)"},
    {"name": "匹配18位身份证号", "regex": "^(\\d{6})(\\d{4})(\\d{2})(\\d{2})(\\d{3})([0-9]|X)$"},
    {"name": "匹配(年-月-日)格式日期", "regex": "([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))"},
    {"name": "匹配正整数", "regex": "^[1-9]\\d*$"},
    {"name": "匹配负整数", "regex": "^-[1-9]\\d*$"},
    {"name": "匹配整数", "regex": "^-?[1-9]\\d*$"},
    {"name": "匹配非负整数（正整数 + 0）", "regex": "^[1-9]\\d*|0$"},
    {"name": "匹配非正整数（负整数 + 0）", "regex": "^-[1-9]\\d*|0$"},
    {"name": "匹配正浮点数", "regex": "^[1-9]\\d*\\.\\d*|0\\.\\d*[1-9]\\d*$"},
    {"name": "匹配负浮点数", "regex": "^-[1-9]\\d*\\.\\d*|-0\\.\\d*[1-9]\\d*$"}
  ];

  function buildRegex(t, g, i, regexValue){
    var op = '';
    op = g ? 'g' : op;
    op = i ? op + 'i' : op;
    if(regexValue === ''){
      util.alert('请先输入正则表达式！');
      return null;
    }
    try{
      return new RegExp(t ? '^' + regexValue + '$' : regexValue, op);
    }catch (e){
      e && util.error('正则表达式语法错误！');
      return null;
    }
  }

  return ['$rootScope', '$scope', '_$services_', function($rootScope, $scope, _$services_){
    $scope.currentPage = '正则表达式';
    $scope.regexList = regexList;
    $scope.regexReset = function(){
      $scope.regexValue = '';
      $scope.regexString = '';
      $scope.regexResult = '';
      $scope.regexExactMatch = true;
      $scope.regexGlobal = false;
      $scope.regexIgnoreCase = false;
    };
    $scope.selectRegex = function(regex){
      $scope.regexValue = regex;
      $scope.onMatch();
    };
    $scope.toggleValue = function(value){
      value = !value;
    };
    $scope.onMatch = function(){
      var regex = buildRegex($scope.regexExactMatch, $scope.regexGlobal, $scope.regexIgnoreCase, $scope.regexValue);
      $scope.regexResult = '';
      if(!regex)return;
      if($scope.regexExactMatch){
        $scope.regexResult = regex.test($scope.regexString) ? "测试通过" : "测试不通过";
      }else{
        var result = $scope.regexString.match(regex);
        if( null == result || 0 == result.length){
          $scope.regexResult = '';
          return false;
        }
        if($scope.regexGlobal){
          var strResult = "共找到 " + result.length + " 处匹配：\r\n";
          for (var i = 0; i < result.length; ++i)strResult = strResult + result[i] + "\r\n";
          $scope.regexResult = strResult;
        }else{
          $scope.regexResult = "匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0];
        }
      }
    };
    $scope.regexReset();
    $scope.$apply();
  }];

});