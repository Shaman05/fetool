<<<<<<< HEAD
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


=======
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


>>>>>>> 84312df732961d9d6bf0b8b3ac301a484c7b3f15
Syntax.brushes.dependency('scala','xml');Syntax.register('scala',function(brush){var keywords=["abstract","do","finally","import","object","return","trait","var","case","catch","class","else","extends","for","forSome","if","lazy","match","new","override","package","private","sealed","super","try","type","while","with","yield","def","final","implicit","protected","throw","val"];brush.push(keywords,{klass:'keyword'});var operators=["_",":","=","=>","<-","<:","<%",">:","#","@"];brush.push(operators,{klass:'operator'});var constants=["this","null","true","false"];brush.push(constants,{klass:'constant'});brush.push({pattern:/"""[\s\S]*?"""/g,klass:'string'});brush.push(Syntax.lib.doubleQuotedString);brush.push({pattern:/(?:def\s+|\.)([a-z_][a-z0-9_]+)/gi,matches:Syntax.extractMatches({klass:'function'})});brush.push(Syntax.lib.camelCaseType);brush.push(Syntax.lib.cStyleFunction);brush.push(Syntax.lib.cStyleComment);brush.push(Syntax.lib.cppStyleComment);brush.derives('xml');});