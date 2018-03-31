// 根据id获取元素
var e = function(id){
	return document.getElementById(id);
}
// 打印日志
var log = function(s){
	console.log(s);
}
var checkCollision = function(obj1,obj2){
	var pos1 = obj1.pos();
	var pos2 = obj2.pos();
	var xdiff = pos2.x - pos1.x;            // 计算两个点的横坐标之差
	var ydiff = pos2.y - pos1.y;            // 计算两个点的纵坐标之差
	var dist = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5); 
	if(dist <= (pos1.r + pos2.r-40))
		return true ;
	return false 
}
// js导入js代码
var include = function(jsname){
	document.write("<script type='text/javascript' src='../js/"+jsname+"'></script>");
}