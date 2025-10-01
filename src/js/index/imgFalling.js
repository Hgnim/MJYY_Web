var stop, staticx;
			var img = new Image();
			img.src = "https://s21.ax1x.com/2024/12/28/pAxPrxU.png";//cherry.png
 
			function Theimg(x, y, s, r, fn) {
				this.x = x;
				this.y = y;
				this.s = s;
				this.r = r;
				this.fn = fn;
			}
 
			Theimg.prototype.draw = function(cxt) {
				cxt.save();
				var xc = 40 * this.s / 4;
				cxt.translate(this.x, this.y);
				cxt.rotate(this.r);
				cxt.drawImage(img, 40, 40, 14 * this.s, 14 * this.s)
				cxt.restore();
			}
 
			Theimg.prototype.update = function() {
				this.x = this.fn.x(this.x, this.y);
				this.y = this.fn.y(this.y, this.y);
				this.r = this.fn.r(this.r);
				if(this.x > window.innerWidth ||
					this.x < 0 ||
					this.y > window.innerHeight ||
					this.y < 0
				) {
					this.r = getRandom('fnr');
					if(Math.random() > 0.4) {
						this.x = getRandom('x');
						this.y = 0;
						this.s = getRandom('s');
						this.r = getRandom('r');
					} else {
						this.x = window.innerWidth;
						this.y = getRandom('y');
						this.s = getRandom('s');
						this.r = getRandom('r');
					}
				}
			}
 
			let TheimgList = function() {
				this.list = [];
			}
			TheimgList.prototype.push = function(theimg) {
				this.list.push(theimg);
			}
			TheimgList.prototype.update = function() {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].update();
				}
			}
			TheimgList.prototype.draw = function(cxt) {
				for(var i = 0, len = this.list.length; i < len; i++) {
					this.list[i].draw(cxt);
				}
			}
			TheimgList.prototype.get = function(i) {
				return this.list[i];
			}
			TheimgList.prototype.size = function() {
				return this.list.length;
			}
 
			function getRandom(option) {
				var ret, random;
				switch(option) {
					case 'x':
						ret = Math.random() * window.innerWidth;
						break;
					case 'y':
						ret = Math.random() * window.innerHeight;
						break;
					case 's':
						ret = Math.random();
						break;
					case 'r':
						ret = Math.random() * 6;
						break;
					case 'fnx':
						random = -0.5 + Math.random() * 1;
						ret = function(x, y) {
							return x + 0.5 * random - 1.7;
						};
						break;
					case 'fny':
						random = 1.5 + Math.random() * 0.7
						ret = function(x, y) {
							return y + random;
						};
						break;
					case 'fnr':
						random = Math.random() * 0.03;
						ret = function(r) {
							return r + random;
						};
						break;
				}
				return ret;
			}
 
			function startTheimg() {
 
				requestAnimationFrame = window.requestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame;
				var canvas = document.createElement('canvas'),
					cxt;
				staticx = true;
				canvas.height = window.innerHeight;
				canvas.width = window.innerWidth;
				//canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;');
                canvas.setAttribute('style', 'position: absolute;left: 0;top: 0;pointer-events: none;z-index:2;');
				canvas.setAttribute('id', 'canvas_theimg');
				document.getElementById('home_imgFalling')/*getElementsByTagName('body')[0]*/.appendChild(canvas);
				canvas_theimg_SizeChange()
				cxt = canvas.getContext('2d');
				var theimgList = new TheimgList();
				let randomFnR;
				for(var i = 0; i < 34; i++)//i值为粒子数量
				{
					var theimg, randomX, randomY, randomS, randomR, randomFnx, randomFny;
					randomX = getRandom('x');
					randomY = getRandom('y');
					randomR = getRandom('r');
					randomS = getRandom('s');
					randomFnx = getRandom('fnx');
					randomFny = getRandom('fny');
					randomFnR = getRandom('fnr');
					theimg = new Theimg(randomX, randomY, randomS, randomR, {
						x: randomFnx,
						y: randomFny,
						r: randomFnR
					});
					theimg.draw(cxt);
					theimgList.push(theimg);
				}
				(function tick() {
					cxt.clearRect(0, 0, canvas.width, canvas.height);
					theimgList.update();
					theimgList.draw(cxt);
					stop = requestAnimationFrame(tick);
				}());
			}
			function canvas_theimg_SizeChange(){
				var canvas = document.getElementById('canvas_theimg');
				canvas.width =document.getElementById('home').offsetWidth; //window.innerWidth;
				canvas.height= document.getElementById('home').offsetHeight;//window.innerHeight;
			}

			function stopp() {
				if(staticx) {
					var child = document.getElementById("canvas_theimg");
					child.parentNode.removeChild(child);
					window.cancelAnimationFrame(stop);
					staticx = false;
				} else {
					//startTheimg();
				}
			}

export function setImgFalling(enable) {
	if(enable) {
		startTheimg();
		$(window).on('resize',canvas_theimg_SizeChange);
	}
	else{
		stopp();
		$(window).off('resize',canvas_theimg_SizeChange);
	}
}