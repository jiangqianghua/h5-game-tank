
var Enemy = function(){
	var x ; 
	var y ; 
	var speed ; 
	var color ;
	var canvas ;
	var ctx ;
	var r = 10; 

	var init = function(_canvas,options){
		x = options.x ;
		y = options.y ;
		speed = options.speed ;
		canvas = _canvas ;
		ctx = canvas.getContext('2d');
	}

	var update = function(){
		x -= speed ;
		y += speed ;

		//粒子从左边离开视界
	    if (x < -10) {
	        x = Math.random() * canvas.width;
	    }
	    //粒子从底部离开视界
	    if (y > canvas.height + 10) {
	        y = Math.random() * canvas.height;
	    }
	}

	var render = function(){
		//log("enemy:" + canvas.width);
		ctx.beginPath();
		// 绘制圆
		ctx.fillStyle = 'rgb(100,100,255)';
		ctx.arc(x,y,r,0,2*Math.PI);  // x,y,r, start,end
        //ctx.strokeStyle = "rgb(100,100,255)";//圆弧填充颜色
        ctx.fill();

	}

	var getPos = function(){
		return {x:x,y:y,r:r}
	}

	this.init = init ; 
	this.update = update ; 
	this.render = render ;
	this.pos = getPos ;
}