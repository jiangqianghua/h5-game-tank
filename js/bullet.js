var Bullet = function (){
	var x ;
	var y ;
	var canvas ;
	var ctx ;
	var dir ; // 1 上， 2 下  3 左  4 右
	var speed ;
	var radius = 10;
	var level = 1;
	var init = function(_canvas,options){
		x = options.x ;
		y = options.y ;
		dir = options.dir ;
		speed = options.speed;
		level = options.level ;
		canvas = _canvas ;
		ctx = canvas.getContext('2d');
	}

	var update = function(){
		if(dir == 1)
		{
			x = x ;
			y = y - speed;
		}
		else if(dir == 2){
			x = x ;
			y = y + speed ; ;
		}
		else if(dir == 3){
			x = x - speed ; 
			y = y ;
		}
		else if(dir == 4){
			x = x + speed ; 
			y = y ;
		}

	}

	var render = function(){

		ctx.beginPath();
		ctx.fillStyle = "#FCB827";
		ctx.beginPath();
		ctx.arc(x,y,level,0,2*Math.PI,false);        //主体上的圆盖
		ctx.closePath();
		ctx.fill();
		// if(dir == 1){
			
		// }else if(dir == 2){
			
		// }else if(dir == 3){
			
		// }else if(dir == 4){
			
		// }
	}
	// 是否超出边界
	var checkOutBound = function(){
		if(x < 0 || y < 0)
			return true ;
		if(x > canvas.width || y > canvas.height)
			return true ;
		return false ;
	}

	var getBullet = function(){
		return {x:x,y:y,level:level};
	}

	this.init = init ; 
	this.update = update ; 
	this.render = render ;
	this.getBullet = getBullet ;
	this.checkOutBound = checkOutBound ; 

}