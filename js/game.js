include('map.js')
include('enemy.js')
include('player.js')
include('tank.js')
include('bullet.js')
include('obstaclesquare.js')
var game ;
var isOver = false ;
const raf = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) {
    window.setTimeout(callback, 1000 / 60); //每帧1000/60ms
  };

var Game = function(){

	var map ;
	var canvas ;
	var width ; 
	var height ; 
	var enemys = [];
	var player ;
	var tank ;
	var bullets = [];
	var obstacles = [];
	// 手势相关
	var startX, startY, moveEndX, moveEndY, X, Y;
	this.init = function(){

		canvas = e('game') ;
		width = canvas.width;
		height = canvas.height ; 
		map = new Map();
		map.init(canvas,{});

		//log("init..."+width + " "+ height);
	}

	this.initData = function(){

	}

	this.initEvent = function(){
		window.addEventListener('touchstart', function(e) {
	        e.preventDefault();
        	startX = e.touches[0].pageX;
        	startY = e.touches[0].pageY;
        	if(startY >= canvas.width/2)
	        {
	        	// 发射炮弹
	        	var bullet = tank.shotBullet();
	        	bullets.push(bullet);
	        }
    	});
	    //手机上用位移计算位置
	    window.addEventListener('touchmove', function(e) {
	        e.preventDefault();
	        if(startY >= canvas.width/2)
	        {
	        	return ;
	        }
	        moveEndX = e.changedTouches[0].pageX;
        	moveEndY = e.changedTouches[0].pageY;
        	X = moveEndX - startX;
        	Y = moveEndY - startY;
        	if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
            	//alert("right");
            	tank.dir(4);
        	}
        	else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
            	//alert("left");
            	tank.dir(3);
        	}
        	else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
            	//alert("down");
            	tank.dir(2);
        	}
        	else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
            	//alert("up");
            	tank.dir(1);
        	}
        	else{
            	//alert("没滑动");
        	}
	    });
	}

	this.render = function(){
		// 检查碰撞
		map.render();
		tank.update();
		tank.render();
		var bulletlist = [];
		for(var i = 0 ; i < bullets.length ; i++){
			var bullet = bullets[i];
			bullet.update();
			bullet.render();
			var isOutBound = bullet.checkOutBound();
			if(isOutBound){
				bulletlist.push(bullet);
			}

			for(var j = 0 ; j < obstacles.length ; j++){
				var obstacle = obstacles[j];
				obstacle.shoted(bullet.getBullet());
			}
		}

		for(var i = 0 ; i < bulletlist.length ; i++){
			var index = this.findIndexByArray(bulletlist[i],bullets);
			if(index >= 0){
				bullets.splice(index,1);
			}
		}

		var obstacleslist = [];
		for(var i = 0 ; i < obstacles.length ; i++){
			var obstacle = obstacles[i];
			obstacle.render();
			var eated = tank.eat(obstacle.getObstacle());
			if(eated){
				obstacle.over();
				tank.evolution(obstacle.getPower());
				obstacleslist.push(obstacle);
			}
		}


		for(var i = 0 ; i < obstacleslist.length ; i++){
			var index = this.findIndexByArray(obstacleslist[i],obstacles);
			if(index >= 0){
				obstacles.splice(index,1);
			}
		}

		if(obstacles.length == 0)
		{
			this.createObstacle();
			//isOver = true ;
			//alert("Congratulations on your first pass, and the back card will look forward to you");
		}
	}

	// 找到指定匀元素的下标
	this.findIndexByArray = function(obj,list){
	for(var i = 0; i < list.length ; i++){
			var _obj = list[i];
			if(obj == _obj){
				return i;
			}
		}
		return -1 ;
	}

	this.createEnemy = function(numEnemy){
		for( var i = 0 ; i < numEnemy; i++){
			var x = Math.random() * map.width();
        	var y = Math.random() * map.height();
			var enemy = new Enemy();
			enemy.init(canvas,{x:x,y:y,speed:2});
			enemys.push(enemy);
		}
	}
	this.createPlayer = function(){
		player = new Player();
		x = Math.random() * map.width();
        y = Math.random() * map.height();
        player.init(canvas,{x:x,y:y});
	}
	this.createTank = function(){
		tank = new Tank();
		x = Math.random() * map.width() - 100;
        y = Math.random() * map.height() - 100;
        tank.init(canvas,{x:x,y:y,dir:4,speed:2});
	}

	this.createObstacle = function(){
		var count = this.randomNumBoth(4,9);
		for(var i = 0 ; i < count ; i++){
			var obstacle = new ObstacleSquare();
			obstacle.init(canvas,{});
			obstacles.push(obstacle);
		}
	}

	this.randomNumBoth = function(Min,Max){
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.round(Rand * Range); //四舍五入
      return num;
	}

}

var resize = function(){
	e('game').width = document.documentElement.clientWidth;
	e('game').height = document.documentElement.clientHeight;
}

window.onresize = resize;

// 程序执行入口
window.onload = function(){
	isOver = false ;	
	resize();
	game = new Game();
	game.init();
	game.initData();
	game.initEvent();
	game.createObstacle();
	// game.createEnemy(10);
	// game.createPlayer();
	game.createTank();
	(function animate() {
		if(isOver)
			return ;
    	game.render();
    	raf(animate);
	})();
}

