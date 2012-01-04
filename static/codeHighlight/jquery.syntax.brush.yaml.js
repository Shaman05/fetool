<<<<<<< HEAD
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


=======
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


>>>>>>> 84312df732961d9d6bf0b8b3ac301a484c7b3f15
Syntax.register('yaml',function(brush){brush.push({pattern:/^\s*#.*$/gm,klass:'comment',allow:['href']});brush.push(Syntax.lib.singleQuotedString);brush.push(Syntax.lib.doubleQuotedString);brush.push({pattern:/(&|\*)[a-z0-9]+/gi,klass:'constant'});brush.push({pattern:/(.*?):/gi,matches:Syntax.extractMatches({klass:'keyword'})});brush.push(Syntax.lib.webLink);});