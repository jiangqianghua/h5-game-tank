var Player = function(){
	var x ;
	var y ;
	var canvas ;
	var ctx ;
	var r = 50 ;
	var init = function(_canvas,options){
		x = options.x ;
		y = options.y ;
		canvas = _canvas ;
		ctx = canvas.getContext('2d');
	}

	var update = function(options){
		x = options.x ;
		y = options.y ;
	}

	var render = function(){
		//log("enemy:" + canvas.width);
		ctx.beginPath();
		// 绘制圆
		ctx.fillStyle = 'rgb(100,255,255)';
		ctx.arc(x,y,r,0,2*Math.PI);  // x,y,r, start,end
        //ctx.strokeStyle = "rgb(100,100,255)";//圆弧填充颜色
        ctx.fill();
	}

	var getPos = function(){
		return {x:x,y:y,r:r}
	}

	this.init = init ; 
	this.render = render ;
	this.update = update;
	this.pos = getPos ;
}