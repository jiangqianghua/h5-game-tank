include('map.js')
include('enemy.js')
include('player.js')
var game ;
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
	        var touchStartX = e.touches[0].pageX;
	        var touchStartY = e.touches[0].pageY;
	        player.update({x:touchStartX,y:touchStartY});
    	});
	    //手机上用位移计算位置
	    window.addEventListener('touchmove', function(e) {
	        e.preventDefault();
	        var touchStartX = e.touches[0].pageX;
	        var touchStartY = e.touches[0].pageY;
	        player.update({x:touchStartX,y:touchStartY});
	    });
	}

	this.render = function(){
		// 检查碰撞
		map.render();
		var collisionlist = [];
		for(var i = 0 ; i < enemys.length ; i++){
			var enemy = enemys[i];
			enemy.update();
			enemy.render();
			if(checkCollision(enemy,player)){
				collisionlist.push(i);
			}
			//log("enemy render");
		}
		player.render();
		for(var i = 0 ; i < collisionlist.length ; i++){
			enemys.splice(i,1);
		}
		
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
}

var resize = function(){
	e('game').width = document.documentElement.clientWidth;
	e('game').height = document.documentElement.clientHeight;
}

window.onresize = resize;

// 程序执行入口
window.onload = function(){
	resize();
	game = new Game();
	game.init();
	game.initData();
	game.initEvent();
	game.createEnemy(10);
	game.createPlayer();
	(function animate() {
    	game.render();
    	raf(animate);
	})();
}

