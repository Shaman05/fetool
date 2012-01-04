<div class="box">
	<div class="edit_area_box">
    	<textarea id="new_code_box" style="height:480px; width:100%"></textarea>
    </div>
    <div class="new_code_btns" style="padding-right:0">
    	<a href="javascript:add_new_html()">新建html</a>
    	<a href="javascript:add_css_file()">新建CSS</a>    	<a href="javascript:push_code()" title="push code">提交新增</a>
    </div>
</div>
<script type="text/javascript">
var s=window.localStorage;
var new_module={
		html:"",
		css:"",
		htmlReady:false
	}
$(function(){
	editAreaLoader.init({
		id: "new_code_box"
		,start_highlight: true
		,allow_toggle: false
		,allow_resize: "y"
		,word_wrap: true
		,language: "en"
		,toolbar: "new_document, save, load, fullscreen, |, search, go_to_line, |, undo, redo, |, select_font, |, change_smooth_selection, highlight, reset_highlight, |, help"
		,syntax: "html"
		,syntax_selection_allow: "css,html,js,php"
		,is_multi_files: true
		,EA_load_callback: "init_new"
		,save_callback: "new_code_save"
		,show_line_colors: true
	});
})
function init_new(id){
	if(id=="new_code_box"){
		add_new_html();
		s.setItem("new_module",JSON.stringify(new_module));
	}
}
function add_new_html(){
	var new_file={id:"new_html_code", text:"", syntax:'html', title:"新建模块 html"};
	editAreaLoader.openFile('new_code_box', new_file);
}
function add_css_file(){
	var new_file={id:"new_css_code", text:"/*Css Document*/", syntax:'css', title:"新建模块 css"};
	editAreaLoader.openFile('new_code_box', new_file);
}
function new_code_save(){
	var a=$("#frame_new_code_box").get(0).contentWindow.document,
		b=$("#tab_browsing_list",a),
		c=b.find("li.selected"),
		file=c.attr("id"),
		re=/tab_file/g,
		type=file.replace(re,'');
	var temp_module=JSON.parse(s.getItem("new_module")),
		code=editAreaLoader.getValue("new_code_box");
	if(type == "_new_html_code"){
		if($.trim(code) != ""){
			temp_module.html=code;
			temp_module.htmlReady=true;
			c.find("a").removeClass("edited");
		}else{
			alert("错误：模块html不能为空！");
			return;
		}
	}
	if(type == "_new_css_code"){
		temp_module.css=code;
		c.find("a").removeClass("edited");
	}
	if(temp_module.htmlReady)
		s.setItem("new_module",JSON.stringify(temp_module));
}

function push_code(){
	var mts=$("#module_type"),
		bms=$("#base_modules"),
		nbm=$("#nbm");
	var type=mts.val(),   //新增方式
		baseName="",      //新增的基类名
		extendName="",    //新增的扩展类名
		newType="",       //新增模块类型(基础模块/框架模块)
		url="index.php/action",
		data="action=add_module&type="+type;
	if(type == "add_base"){
		baseName=$.trim($("#new_bc_name").val());
		if(baseName == ""){
			alert("未填写基类类名");
			return;
		}else{
			newType=$("#radios input:checked").val();
			data+="&baseName="+baseName+"&add_type="+newType;
		}
	}
	if(type == "add_extend"){
		extendName=bms.val()=="unselect"?null:bms.val();
		if(extendName == null){
			alert("未选择扩展模块的基类");
			return;
		}else{
			data+="&baseClass="+extendName;
		}
	}
	var add_new_module=JSON.parse(s.getItem("new_module"));
	if(add_new_module.htmlReady){
		console.log(add_new_module)
		var htmlCode=add_new_module.html,
			cssCode=add_new_module.css;
		$.ajax({
			type:"POST",
			url:url,
			data:data+"&htmlCode="+htmlCode+"&cssCode="+cssCode,
			beforeSend:function(){},
			error:function(){},
			success:function(msg){
				s.setItem("new_module",JSON.stringify(new_module));
				alert(msg);
			}
		})
	}else{
		alert("错误：提交新增前请先保存！");
		return;
	}
}
</script>