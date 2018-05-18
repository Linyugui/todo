function creatTask(title) {
	var obj = new Object();
	obj.title = title;
	obj.completed = true;
	return obj;
}
//获取输入框输入的内容，若输入的内容为空则直接跳出，若不为空则生成任务对象，并把它写进localStorage
function get() {
	var value = document.getElementById('tittle').value;
	if(value=="")
		return;
	document.getElementById('tittle').value = "";
	var list = localStorage.getItem("list");
	list = JSON.parse(list)||[];
	list.push(creatTask(value));					
	list = JSON.stringify(list);
	localStorage.setItem("list",list);
	var str = window.location.href
	var index = str.indexOf("#");
	if(index  == -1)
		showAll();	
	else
	{
		var value = str.substr(index+2);
		show(value);
	}		
}
//根据value的值调用不同的输出函数
function show(value){
	if(value == "all")
		showAll();
	else if(value == "completed")
		showCompleted();
	else if(value == "active")
		showActive();
}
//输出所有的任务列表，通过字符串拼接成Html代码，替换到表格中
function showAll() {
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	var str = "<table><tbody>";
	for (var i = 0; i < (list.length||0); i++) {
		if(list[i].completed==false)
			str+="<tr><td id='list"+i+"' class='completed' ondblclick='updata("+i+")'>";
		else
			str+="<tr><td id='list"+i+"' class='uncompleted' ondblclick='updata("+i+")'>";
		str+=list[i].title;
		if(list[i].completed==true)
			str+="</td><td><button class='btn btn-default btn-success' onclick='completed("+i+")'>完成</button>";
		else
			str+="</td><td><button class='btn btn-default btn-warning' onclick='uncompleted("+i+")'>取消</button>";
		str+="<button class='btn btn-default btn-danger' onclick='deleted("+i+")'>删除</button></td></tr>";
	}
	str+="</tbody></table>";
	document.getElementById("container").innerHTML=str;
}
//输出所有未完成的任务列表，通过字符串拼接成Html代码，替换到表格中
function showActive() {
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	var str = "<table><tbody>";
	for (var i = 0; i < (list.length||0); i++) {
		if(list[i].completed==true)
		{
			str+="<tr><td id='list"+i+"' class='uncompleted' ondblclick='updata("+i+")'>";
			str+=list[i].title;
			str+="</td><td><button class='btn btn-default btn-success' onclick='completed("+i+")'>完成</button>";
			str+="<button class='btn btn-default btn-danger' onclick='deleted("+i+")'>删除</button></td></tr>";
		}
	}
	str+="</tbody></table>";
	document.getElementById("container").innerHTML=str;
}
//输出所有完成的任务列表，通过字符串拼接成Html代码，替换到表格中
function showCompleted() {
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	var str = "<table><tbody>";
	for (var i = 0; i < (list.length||0); i++) {
		if(list[i].completed==false)
		{
			str+="<tr><td id='list"+i+"' class='completed' ondblclick='updata("+i+")'>";
			str+=list[i].title;
			str+="</td><td><button class='btn btn-default btn-warning' onclick='uncompleted("+i+")'>取消</button>";
			str+="<button class='btn btn-default btn-danger' onclick='deleted("+i+")'>删除</button></td></tr>";
		}
	}
	str+="</tbody></table>";
	document.getElementById("container").innerHTML=str;
}
//根据i将对应任务列表对象的completed值设置为false，并根据现在的url的参数调用show函数
function completed(i) {
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	list[i].completed=false;
	list = JSON.stringify(list);
	localStorage.setItem("list",list);
	var str = window.location.href
	var index = str.indexOf("#");
	if(index  == -1)
		showAll();	
	else
	{
		var value = str.substr(index+2);
		show(value);
	}	
}
//根据i将对应任务列表对象的completed值设置为true，并根据现在的url的参数调用show函数
function uncompleted(i){
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	list[i].completed=true;
	list = JSON.stringify(list);
	localStorage.setItem("list",list);
	var str = window.location.href
	var index = str.indexOf("#");
	if(index  == -1)
		showAll();	
	else
	{
		var value = str.substr(index+2);
		show(value);
	}		
}
//根据i将对应任务列表对象删除，并根据现在的url的参数调用show函数
function deleted(i) {
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	list.splice(i,1);
	list = JSON.stringify(list);
	localStorage.setItem("list",list);
	var str = window.location.href
	var index = str.indexOf("#");
	if(index  == -1)
		showAll();	
	else
	{
		var value = str.substr(index+2);
		show(value);
	}			
}
function updata(i) {
	var id = "list" + i;
	var list = localStorage.getItem("list");
	list = JSON.parse(list);
	var value = list[i].title;
	var str="<input id='task"+i+"' type='text' class='form-control' value='"+value+"' onkeydown='if(event.keyCode==13){change("+i+")}'>";
	document.getElementById(id).innerHTML=str;
}

function change(i) {
	var id = "task" + i;
	var list = localStorage.getItem("list");
	var value = document.getElementById(id).value;
	list = JSON.parse(list);
	list[i].title = value;
	list = JSON.stringify(list);
	localStorage.setItem("list",list);
	var id = "list" + i;
	document.getElementById(id).innerHTML=value;
}