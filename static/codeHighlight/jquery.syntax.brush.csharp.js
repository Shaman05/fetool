<<<<<<< HEAD
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


=======
// This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
// Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>


>>>>>>> 84312df732961d9d6bf0b8b3ac301a484c7b3f15
Syntax.register('csharp',function(brush){var keywords=["abstract","add","alias","ascending","base","break","case","catch","class","const","continue","default","delegate","descending","do","dynamic","else","enum","event","explicit","extern","finally","for","foreach","from","get","global","goto","group","if","implicit","in","interface","into","join","let","lock","namespace","new","operator","orderby","out","override","params","partial","readonly","ref","remove","return","sealed","select","set","stackalloc","static","struct","switch","throw","try","unsafe","using","value","var","virtual","volatile","where","while","yield"];var access=["public","private","internal","protected"];var types=["object","bool","byte","fixed","float","uint","char","ulong","ushort","decimal","int","sbyte","short","void","long","string","double"];var operators=["+","-","*","/","%","&","|","^","!","~","&&","||","++","--","<<",">>","==","!=","<",">","<=",">=","=","?","new","as","is","sizeof","typeof","checked","unchecked"];var values=["this","true","false","null"];brush.push(values,{klass:'constant'});brush.push(types,{klass:'type'});brush.push(keywords,{klass:'keyword'});brush.push(operators,{klass:'operator'});brush.push(access,{klass:'access'});brush.push(Syntax.lib.cStyleFunction);brush.push({pattern:/(?:\.)([a-z_][a-z0-9_]+)/gi,matches:Syntax.extractMatches({klass:'function'})});brush.push(Syntax.lib.camelCaseType);brush.push(Syntax.lib.cStyleComment);brush.push(Syntax.lib.cppStyleComment);brush.push(Syntax.lib.webLink);brush.push(Syntax.lib.singleQuotedString);brush.push(Syntax.lib.doubleQuotedString);brush.push(Syntax.lib.stringEscape);brush.push(Syntax.lib.decimalNumber);brush.push(Syntax.lib.hexNumber);});