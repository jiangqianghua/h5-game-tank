var ObstacleSquare = function(){
	var x ;
	var y ;
	var canvas ;
	var ctx ;
	var level = 0; //[0,10]
	var power ;
	var isDie = 0  ;
	var color ;
	var init = function(_canvas,options){
		canvas = _canvas ;
		ctx = canvas.getContext('2d');
		randomAttr();
		isDie = 1 ;
		color = getRandomColor();
	}

	var randomAttr = function(){
		x = randomNumBoth(50,canvas.width-50);
		y = randomNumBoth(50,canvas.height-50);
		level = randomNumBoth(5,10);
		power = level ;
	}

	var randomNumBoth = function(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
	}

	var render = function(){
		if(isDie == 0 )
			return ;
		if(level > 2){
			ctx.beginPath();
			ctx.fillStyle = "#FF0000";
			ctx.fillRect(x,y,level * 5,level*7);
		}
		else
		{
			ctx.beginPath();
			// 绘制圆
			var r = 20; //半径最小是10，大小是浏览器宽高最小值除以10
			ctx.arc(x,y,r,0,Math.PI*2,true);
			//ctx.strokeStyle = "#fff";//o.color;
			//创建渐变
			var g = ctx.createRadialGradient(x,y,0,x,y,r);
			g.addColorStop(0,"#fff");
			g.addColorStop(1,getRandomColor());
			//g.addColorStop(2,getRandomColor());
			ctx.fillStyle = g ;
			ctx.fill();
		}
	}

	var shoted = function(bullet){
		var w = level * 10 ; 
		var h = level * 12 ;
		if(bullet.x >= x && bullet.x <= (x + w) &&
			bullet.y >= y && bullet.y <= (y + h))
			level = level - bullet.level ;
	}
	var getRandomColor = function(){
		var color = "rgba("+randomNumBoth(0,255)+","+randomNumBoth(0,255)+","+randomNumBoth(0,255)+",0)";
		return color ;
	}

	var getObstacle = function(){
		return {x:x,y:y,level:level}
	}

	var over = function(){
		level = 0 ;
		isDie = 0 ;
	}

	var getPower = function(){
		return power ;
	}

	this.init = init; 
	this.render = render; 
	this.shoted = shoted;
	this.getObstacle = getObstacle ; 
	this.over = over ;
	this.getPower = getPower ; 
}