<<<<<<< HEAD
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


=======
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


>>>>>>> 84312df732961d9d6bf0b8b3ac301a484c7b3f15
Syntax.register('php-script',function(brush){var keywords=["abstract","and","as","break","case","cfunction","class","const","continue","declare","default","die","do","echo","else","elseif","enddeclare","endfor","endforeach","endif","endswitch","endwhile","extends","extends","for","foreach","function","global","if","implements","include","include_once","interface","old_function","or","require","require_once","return","static","switch","throw","use","var","while","xor"];var access=["private","protected","public"];var operators=["+","*","/","-","&","|","~","!","%","<","=",">","[","]","new"];var values=["this","true","false"];brush.push(values,{klass:'constant'});brush.push(keywords,{klass:'keyword'});brush.push(operators,{klass:'operator'});brush.push(access,{klass:'access'});brush.push({pattern:/\$[a-z_][a-z0-9]*/gi,klass:'variable'});brush.push(Syntax.lib.camelCaseType);brush.push(Syntax.lib.cStyleFunction);brush.push(Syntax.lib.cStyleComment);brush.push(Syntax.lib.cppStyleComment);brush.push(Syntax.lib.perlStyleComment);brush.push(Syntax.lib.webLink);brush.push(Syntax.lib.singleQuotedString);brush.push(Syntax.lib.doubleQuotedString);brush.push(Syntax.lib.stringEscape);brush.push(Syntax.lib.decimalNumber);brush.push(Syntax.lib.hexNumber);brush.processes['function']=Syntax.lib.webLinkProcess("http://www.php.net/manual-lookup.php?pattern=");});