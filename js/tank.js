var Tank = function(){
	var x ;
	var y ;
	var canvas ;
	var ctx ;
	var dir ; // 1 上， 2 下  3 左  4 右
	var speed ;
	var level ; // 坦克级别，威力大小
	var width = 70;
	var height = 70;
	var init = function(_canvas,options){
		x = options.x ;
		y = options.y ;
		dir = options.dir ;
		speed = options.speed;
		canvas = _canvas ;
		ctx = canvas.getContext('2d');
		level = 1;
	}

	var checkBounds = function(){
		var pos = getBulletPos();
		if( pos.x<= 0 || pos.y <= 0)
			return true;
		if(pos.x > canvas.width || pos.y > canvas.height)
			return true ;
		return false ;
	}


	var update = function(){

		if(checkBounds())
			return ;

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
		if(dir == 1){
			var centreX = x+45 ; 
			var centreY = y+35 ;
			//ctx.rotate(20*Math.PI/180);
			ctx.fillStyle = "#542174";
			ctx.fillRect(x,y,20,65);                //坦克左边的履带
			ctx.fillRect(x+70,y,20,65);                //右边的履带
			ctx.fillRect(x+23,y+10,44,50);                //中间的主体
			ctx.fillStyle = "#FCB827";
			ctx.beginPath();
			ctx.arc(centreX,centreY,16,0,2*Math.PI,false);        //主体上的圆盖
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = "#FCB827";
			ctx.lineWidth = level;
			ctx.moveTo(centreX,centreY);                        //炮筒起点
			ctx.lineTo(centreX,centreY - 60);                            //炮筒终点

			ctx.stroke(); 
		}
		if(dir == 2){
			var centreX = x+45 ; 
			var centreY = y+35 ;
			//ctx.rotate(20*Math.PI/180);
			ctx.fillStyle = "#542174";
			ctx.fillRect(x,y,20,65);                //坦克左边的履带
			ctx.fillRect(x+70,y,20,65);                //右边的履带
			ctx.fillRect(x+23,y+10,44,50);                //中间的主体
			ctx.fillStyle = "#FCB827";
			ctx.beginPath();
			ctx.arc(centreX,centreY,16,0,2*Math.PI,false);        //主体上的圆盖
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = "#FCB827";
			ctx.lineWidth = level;
			ctx.moveTo(centreX,centreY);                        //炮筒起点
			ctx.lineTo(centreX,centreY + 60);                            //炮筒终点

			ctx.stroke();
		}else if(dir == 3){
			var centreX = x+35 ; 
			var centreY = y+45 ;
			//ctx.rotate(20*Math.PI/180);
			ctx.fillStyle = "#542174";
			ctx.fillRect(x,y,65,20);                //坦克上边的履带
			ctx.fillRect(x,y+70,65,20);                //下边的履带
			ctx.fillRect(x+10,y+23,50,44);                //中间的主体
			ctx.fillStyle = "#FCB827";
			ctx.beginPath();
			ctx.arc(centreX,centreY,16,0,2*Math.PI,false);        //主体上的圆盖
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = "#FCB827";
			ctx.lineWidth = level;
			ctx.moveTo(centreX,centreY);                        //炮筒起点
			ctx.lineTo(centreX-60,centreY);                            //炮筒终点

			ctx.stroke();
		}else if(dir == 4){
			var centreX = x+35 ; 
			var centreY = y+45 ;
			//ctx.rotate(20*Math.PI/180);
			ctx.fillStyle = "#542174";
			ctx.fillRect(x,y,65,20);                //坦克上边的履带
			ctx.fillRect(x,y+70,65,20);                //下边的履带
			ctx.fillRect(x+10,y+23,50,44);                //中间的主体
			ctx.fillStyle = "#FCB827";
			ctx.beginPath();
			ctx.arc(centreX,centreY,16,0,2*Math.PI,false);        //主体上的圆盖
			ctx.closePath();
			ctx.fill();
			ctx.strokeStyle = "#FCB827";
			ctx.lineWidth = level;
			ctx.moveTo(centreX,centreY);                        //炮筒起点
			ctx.lineTo(centreX+60,centreY);                            //炮筒终点

			ctx.stroke();
		}
	}

	var setDir = function(_dir){
		dir = _dir;
	}




	var getBulletPos = function(){
		var posX , posY ;
		if(dir == 1)
		{
			var centreX = x+45 ; 
			var centreY = y+35 ;
			posX = centreX;
			posY = centreY - 60 ;
		}
		else if(dir == 2){
			var centreX = x+45 ; 
			var centreY = y+35 ;
			posX = centreX;
			posY = centreY + 60 ;
		}
		else if(dir == 3){
			var centreX = x+35 ; 
			var centreY = y+45 ;
			posX = centreX - 60; 
			posY = centreY;
		}
		else if(dir == 4){
			var centreX = x+35 ; 
			var centreY = y+45 ;
			posX = centreX + 60; 
			posY = centreY;
		}
		return {x:posX,y:posY,dir:dir};
	}

	var shotBullet = function(){
		var bullet = new Bullet();
		var pos = getBulletPos();
	    bullet.init(canvas,{x:pos.x,y:pos.y,dir:dir,speed:level*5,level:level});
	    return bullet ;
	}

	var eat = function(food){
		if(food.level <= 2){
			//
			if(food.x >= x  && food.x <= (x + width) &&
				food.y >= y  && food.y <= (y + height)){
				return true;
			}
		}
		return false ;
	}

	var evolution = function(evolutionValue){
		level += 1 ;
	}

	this.init = init ; 
	this.update = update ; 
	this.render = render ;
	this.dir = setDir;
	this.shotBullet = shotBullet;
	this.eat = eat ;
	this.evolution = evolution;
}