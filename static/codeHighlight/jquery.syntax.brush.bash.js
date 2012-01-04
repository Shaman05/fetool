<<<<<<< HEAD
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


=======
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


>>>>>>> 84312df732961d9d6bf0b8b3ac301a484c7b3f15
Syntax.brushes.dependency('bash','bash-script');Syntax.register('bash',function(brush){brush.push({pattern:/^([\w@:~ ]*?[\$|\#])\s+(.*?)$/gm,matches:Syntax.extractMatches({klass:'prompt'},{brush:'bash-script'})});brush.push({pattern:/^\-\- .*$/gm,klass:'comment',allow:['href']});brush.push(Syntax.lib.singleQuotedString);brush.push(Syntax.lib.doubleQuotedString);brush.push(Syntax.lib.stringEscape);brush.push(Syntax.lib.webLink);brush.push({klass:'stderr',allow:['string','comment','constant','href']});});