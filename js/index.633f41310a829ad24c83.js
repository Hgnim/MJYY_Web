(()=>{var t={812:()=>{!function(){if(!/Mobi|Android|iPhone/i.test(navigator.userAgent)){function t(t,e,o){return t.getAttribute(e)||o}function e(t){return document.getElementsByTagName(t)}function o(){i=l.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,s=l.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function n(){var t,e,o,l,r,m;d.clearRect(0,0,i,s),u.forEach((function(n,p){for(n.x+=n.xa,n.y+=n.ya,n.xa*=n.x>i||n.x<0?-1:1,n.ya*=n.y>s||n.y<0?-1:1,d.fillRect(n.x-.5,n.y-.5,1,1),e=p+1;e<a.length;e++)null!==(t=a[e]).x&&null!==t.y&&(l=n.x-t.x,r=n.y-t.y,(m=l*l+r*r)<t.max&&(t===h&&m>=t.max/10&&(n.x-=.03*l,n.y-=.03*r),o=(t.max-m)/t.max,d.beginPath(),d.lineWidth=o/2,d.strokeStyle="rgba("+c.c+","+(o+.2)+")",d.moveTo(n.x,n.y),d.lineTo(t.x,t.y),d.stroke()))})),p(n)}var i,s,a,l=document.createElement("canvas"),c=function(){var o=e("script"),n=o.length,i=o[n-1];return{l:n,z:t(i,"zIndex",0),o:t(i,"opacity",.4),c:t(i,"color","74,140,229"),n:t(i,"count",80)}}(),r="c_n"+c.l,d=l.getContext("2d"),p=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){window.setTimeout(t,1e3/45)},m=Math.random,h={x:null,y:null,max:75e3};l.id=r,l.style.cssText="position:fixed;top:0;left:0;z-index:"+c.z+";opacity:"+c.o,e("body")[0].appendChild(l),o(),window.onmousemove=function(t){t=t||window.event,h.x=t.clientX,h.y=t.clientY},window.onmouseout=function(){h.x=null,h.y=null},window.addEventListener("resize",o);for(var u=[],g=0;c.n>g;g++){var y=m()*i,f=m()*s,w=3*m()-1,x=3*m()-1;u.push({x:y,y:f,xa:w,ya:x,max:14e3})}a=u.concat([h]),setTimeout((function(){n()}),100)}}()},757:()=>{var t=new Image;function e(t,e,o,n,i){this.x=t,this.y=e,this.s=o,this.r=n,this.fn=i}function o(t){var e,o;switch(t){case"x":e=Math.random()*window.innerWidth;break;case"y":e=Math.random()*window.innerHeight;break;case"s":e=Math.random();break;case"r":e=6*Math.random();break;case"fnx":o=1*Math.random()-.5,e=function(t,e){return t+.5*o-1.7};break;case"fny":o=1.5+.7*Math.random(),e=function(t,e){return e+o};break;case"fnr":o=.03*Math.random(),e=function(t){return t+o}}return e}function n(){var t=document.getElementById("canvas_theimg");t.width=document.getElementById("home").offsetWidth,t.height=document.getElementById("home").offsetHeight}t.src="https://s21.ax1x.com/2024/12/28/pAxPrxU.png",e.prototype.draw=function(e){e.save(),this.s,e.translate(this.x,this.y),e.rotate(this.r),e.drawImage(t,40,40,14*this.s,14*this.s),e.restore()},e.prototype.update=function(){this.x=this.fn.x(this.x,this.y),this.y=this.fn.y(this.y,this.y),this.r=this.fn.r(this.r),(this.x>window.innerWidth||this.x<0||this.y>window.innerHeight||this.y<0)&&(this.r=o("fnr"),Math.random()>.4?(this.x=o("x"),this.y=0,this.s=o("s"),this.r=o("r")):(this.x=window.innerWidth,this.y=o("y"),this.s=o("s"),this.r=o("r")))},TheimgList=function(){this.list=[]},TheimgList.prototype.push=function(t){this.list.push(t)},TheimgList.prototype.update=function(){for(var t=0,e=this.list.length;t<e;t++)this.list[t].update()},TheimgList.prototype.draw=function(t){for(var e=0,o=this.list.length;e<o;e++)this.list[e].draw(t)},TheimgList.prototype.get=function(t){return this.list[t]},TheimgList.prototype.size=function(){return this.list.length},t.onload=function(){(function(){requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame;var t,i=document.createElement("canvas");i.height=window.innerHeight,i.width=window.innerWidth,i.setAttribute("style","position: absolute;left: 0;top: 0;pointer-events: none;z-index:2;"),i.setAttribute("id","canvas_theimg"),document.getElementById("home").appendChild(i),n(),t=i.getContext("2d");for(var s=new TheimgList,a=0;a<34;a++){var l,c,r,d,p,m,h;c=o("x"),r=o("y"),p=o("r"),d=o("s"),m=o("fnx"),h=o("fny"),randomFnR=o("fnr"),(l=new e(c,r,d,p,{x:m,y:h,r:randomFnR})).draw(t),s.push(l)}requestAnimationFrame((function(){t.clearRect(0,0,i.width,i.height),s.update(),s.draw(t),requestAnimationFrame(arguments.callee)}))})(),window.addEventListener("resize",(function(){n()}))}},95:()=>{$((function(){function t(){$(window).scrollTop()>=200?$(".sticky-navigation").removeClass("navbar-dark").addClass("shadow-bottom").addClass("navbar-light"):$(".sticky-navigation").removeClass("shadow-bottom").removeClass("navbar-light").addClass("navbar-dark")}$(window).scroll((function(){t()})),t()}))},195:()=>{$((function(){$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$("a.page-scroll").bind("click",(function(t){var e=$(this);$("html, body").stop().animate({scrollTop:$(e.attr("href")).offset().top-50},1e3),t.preventDefault()})),$(window).scroll((function(){var n=$(window).scrollTop();return t||(n>=600?0==e&&(o.style.animation="scroll-top_out 1s forwards",e=1):1==e&&(o.style.animation="scroll-top_in 1s forwards",e=0)),!1}));var t=!1,e=0,o=document.getElementById("upTopButton"),n=0;o.addEventListener("mouseenter",(i=>{t||1!=e||(n=0,o.style.right="20px",o.style.animation="scroll-top_shak 0.5s infinite")})),o.addEventListener("mouseleave",(i=>{t||1!=e||(n=1,o.addEventListener("animationiteration",(function t(){1==n&&(o.style.animationIterationCount=0,o.style.animation=""),o.removeEventListener("animationiteration",t)})))})),$(".scroll-top").click((function(){t=!0;var n=document.querySelector("#upTopButton");o.style.bottom="0",o.style.top=window.innerHeight-20+"px",o.style.right="20px",o.style.setProperty("--defTopValue",o.style.top),n.addEventListener("animationend",(function i(){o.style.top="",o.style.bottom="",e=0,t=!1,n.removeEventListener("animationend",i)})),o.style.animation="scroll-top_fly 1s forwards",$("html, body").stop().animate({scrollTop:0},1e3)}))}))},846:()=>{var t,e=document.title;document.addEventListener("visibilitychange",(function(){document.hidden?(document.title="😭不要走--"+e,clearTimeout(t)):(document.title="🥳欢迎回来--"+e,t=setTimeout((function(){document.title=e}),2e3))}))},7:()=>{document.addEventListener("DOMContentLoaded",(function(){document.getElementById("navbarCollapse").addEventListener("click",(function(t){var e=!0;try{t.target.classList.forEach((t=>{if(t.includes("dropdown"))throw"dropdown-item"!=t&&(e=!1),Error("break")}))}catch{}if(e){var o=document.getElementById("navbarCollapse_showButton");"true"==o.ariaExpanded&&o.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0}))}}))}))}},e={};function o(n){var i=e[n];if(void 0!==i)return i.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,o),s.exports}o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{"use strict";var t={};o.r(t),o.d(t,{OpenSharePage:()=>r,shareWindowInfoCopyBtn_Click:()=>c});var e={};o.r(e),o.d(e,{home_a_run:()=>d,toggleTheme_Click:()=>p});var n={};o.r(n),o.d(n,{LoadingOver:()=>u,WaitTimeOut:()=>y,sleep:()=>f,waitToRemoveLoadingPage:()=>g});var i={};o.r(i),o.d(i,{GetResourceMode:()=>B,SetResourceMode:()=>I,loadMediaResources:()=>k,userSelectResourceMode:()=>T});var s={};o.r(s),o.d(s,{pingServer_Start:()=>C});var a={};function l(t){const e=window;for(const o in t)t.hasOwnProperty(o)&&(e[o]=t[o])}function c(){navigator.clipboard.writeText(document.getElementById("share-window-info-textBox").value),showToast("复制成功",2e3,"share-window-toast",void 0,"share-window")}function r(){document.getElementById("share-window-info-qrcodeImg").src="assets/img/copy/mjyy-qrcode.png",document.getElementById("share-window-info-textBox").value="https://mjyy.top",$("#share-page").fadeIn()}function d(){try{""===document.getElementById("home_MainText_Div").style.animation&&""===document.getElementById("home_MainButton").style.animation||(document.getElementById("home_MainText_Div").style.opacity="0",document.getElementById("home_MainButton").style.opacity="0",document.getElementById("home_MainText_Div").style.animation="",document.getElementById("home_MainButton").style.animation="")}catch{}finally{var t=setInterval((function(){document.getElementById("home_MainText_Div").style.animation="home_MainText_a 2.5s forwards",document.getElementById("home_MainButton").style.animation="home_MainButton_a 2.5s 800ms forwards",clearInterval(t)}),0)}}function p(){let t=document.querySelector("html");"dark"===t.getAttribute("data-theme")?t.setAttribute("data-theme","light"):t.setAttribute("data-theme","dark")}o.r(a),o.d(a,{BodyOnLoad:()=>A,CheckSystemTheme:()=>q}),o(7),o(95),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("share-page").addEventListener("click",(function(){$("#share-page").fadeOut()})),document.getElementById("share-window").addEventListener("click",(function(t){t.stopPropagation()}))})),o(195),o(846);let m=!1,h=0;function u(t=1){m||(h=Number(h)+Number(t),h>=2&&(m=!0,$("#preloader").on(500).fadeOut(),$(".preloader").on(600).fadeOut("slow"),d(),g()))}async function g(){await f(3e3),document.getElementById("preloader").remove(),document.getElementsByClassName("pace")[0].remove()}async function y(){await f(5e3),m||$("#main-ld-skipbt").fadeIn()}function f(t){return new Promise((e=>{setTimeout(e,t)}))}function w(t){return new Promise((e=>{setTimeout(e,t)}))}document.addEventListener("DOMContentLoaded",(function(){y();const t=[["spinning-coin.css","spinning-coin_animation",0],["cube.css","cube_animation",6],["bar-spin.css","bar-spin_animation",0],["wind-up.css","wind-up_animation",0],["push-pop.css","push-pop",2],["pong.css","pong_animation",3],["waterfall.css","waterfall_animation",5],["fk.css","fk_animation",2],["follow-the-leader-line.css","follow-the-leader-line_animation",5],["slide-in.css","slide-in_animation",3]];let e;{let o=0,n=t.length-1;e=Math.floor(Math.random()*(n-o+1))+o}let o=document.createElement("link");o.rel="stylesheet",o.type="text/css";let n=document.createElement("div");o.href="assets/css/animation/"+t[e][0],n.className=t[e][1];for(let o=0;o<t[e][2];o++)n.appendChild(document.createElement("div"));document.head.appendChild(o),document.getElementById("main-ld-loader").appendChild(n)}));var x=function(t,e,o,n){return new(o||(o=Promise))((function(i,s){function a(t){try{c(n.next(t))}catch(t){s(t)}}function l(t){try{c(n.throw(t))}catch(t){s(t)}}function c(t){var e;t.done?i(t.value):(e=t.value,e instanceof o?e:new o((function(t){t(e)}))).then(a,l)}c((n=n.apply(t,e||[])).next())}))};$((function(){{const t=["video_page","photo","introduce","rule","join_us"],e={video_page:{isChange:!1,restoreFunc:function(t){t[0].style.opacity="0",t[1].style.left=-$(window).width()+"px",t[2].style.right=-$(window).width()+"px"}},photo:{isChange:!1,restoreFunc:function(t,e=0){const n=0==e;for(;n;){switch(n&&e++,e){case 1:n&&(t=o("photo_sub1")),null!=t&&(t[0].style.left=-$(window).width()+"px",t[1].style.opacity="0",t[1].style.top=`${t[1].offsetHeight}px`,t[2].style.opacity="0",t[2].style.top=`${t[2].offsetHeight}px`,t[3].style.opacity="0",t[3].style.top=`${t[3].offsetHeight}px`);break;case 2:n&&(t=o("photo_sub2")),null!=t&&(t[0].style.opacity="0")}if(n&&!(e<2))break}}},introduce:{isChange:!1,restoreFunc:function(t){t.forEach((t=>{t.style.opacity="0"}))}},rule:{isChange:!1,restoreFunc:function(t){t[0].style.left="0",t[1].style.right="0",t[2].style.opacity="0"}},join_us:{isChange:!1,restoreFunc:function(t){t[0].style.opacity="0",t[0].style.top=`${t[0].offsetTop}px`,t[1].style.opacity="0",t[1].style.bottom=`${t[0].offsetTop}px`,t[2].style.opacity="0",t[3].style.opacity="0",t[4].style.opacity="0"}}};function o(t){let e=null;switch(t){case"video_page":e=[document.getElementById("video-page_header"),document.getElementById("video-page_video-box_1"),document.getElementById("video-page_video-box_2")];break;case"photo":e=[];break;case"photo_sub1":e=[document.getElementById("photo_sub1_title"),document.getElementById("photo_sub1_photoBox1"),document.getElementById("photo_sub1_photoBox2"),document.getElementById("photo_sub1_photoBox3")];break;case"photo_sub2":e=[document.getElementById("photo_sub2")];break;case"introduce":e=[document.getElementById("introduce_header"),document.getElementById("serverIntroductoryText")];break;case"rule":e=[document.getElementById("rule_header"),document.querySelectorAll("#ruleText_Button button")[0],document.getElementById("ruleText_border")];break;case"join_us":e=[document.getElementById("join_us_header_logo"),document.getElementById("join_us_header_text"),document.getElementById("joinUsText"),document.getElementById("joinUs_qgQRCode"),document.getElementById("joinUsText2")]}return e}let n=0;$(window).scroll((function(){const i=Date.now();if(i-n>64){n=i;{const t=document.getElementById("main-background_img");if(null!=t){const e=parseFloat(window.getComputedStyle(t).width)-$(window).width(),o=$(window).scrollTop(),n=$(document).height()-$(window).height();t.style.left=-o/n*e+"px"}}const s=$(window).height(),a=$(window).width(),l=$(window).scrollTop(),c=l+s;for(let n=0;n<t.length;n++){const i=document.getElementById(t[n]);if(null!=i){const s=i.offsetTop,r=i.clientHeight;if(c>=s&&l<s+r){t[n];{const i=o(t[n]),d=(c-s)/r,p=(l-s)/r;if(null!=i)switch(t[n]){case"video_page":if(null!=i[0]&&null!=i[1]&&null!=i[2])if(p>.25){let t=(p-.25)/.5;t>1&&(t=1),i[0].style.opacity=""+(1-t);{const e=-t*$(window).width();i[1].style.left=`${e}px`,i[2].style.right=`${e}px`}}else if(d<=.5){let t=d/.5;t>1&&(t=1),i[0].style.opacity=t.toString();{const e=-($(window).width()-t*$(window).width());i[1].style.left=`${e}px`,i[2].style.right=`${e}px`}}else i[0].style.opacity="100%",i[1].style.left="0",i[2].style.right="0";break;case"photo":{const t=document.getElementById("photo_sub1");if(null!=t){const n=t.offsetTop,i=t.clientHeight,s=o("photo_sub1"),r=(c-n)/i,d=(l-n)/i;if(null!=s)if(d>.8){let t=(d-.8)/.2;t>1&&(t=1),s.forEach((e=>{e.style.opacity=(1-t).toString()}))}else if(r>.25&&r<.5)if(r<.34){let t=(r-.25)/.8;t>1&&(t=1),s[1].style.opacity=t.toString(),s[1].style.top=(1-t)*s[1].offsetHeight+"px"}else if(r<.42){let t=(r-.33)/.8;t>1&&(t=1),s[1].style.opacity="1",s[1].style.top="0",s[2].style.opacity=t.toString(),s[2].style.top=(1-t)*s[2].offsetHeight+"px",s[0].style.left=`-${(1-t)*a}px`}else{let t=(r-.41)/.8;t>1&&(t=1),s[0].style.left="0",s[1].style.opacity="1",s[1].style.top="0",s[2].style.opacity="1",s[2].style.top="0",s[3].style.opacity=t.toString(),s[3].style.top=(1-t)*s[3].offsetHeight+"px"}else r>=.5?(s[0].style.opacity="1",s[0].style.left="0",s[1].style.opacity="1",s[1].style.top="0",s[2].style.opacity="1",s[2].style.top="0",s[3].style.opacity="1",s[3].style.top="0"):r<=.25&&e.photo.restoreFunc(s,1)}}if(v){const t=document.getElementById("photo_sub2");if(null!=t){const e=t.offsetTop,o=t.clientHeight,n=(c-e)/o,i=(l-e)/o;if(i>.8){let e=(i-.8)/.2;e>1&&(e=1),t.style.opacity=(1-e).toString()}else if(n<=.5){let e=n/.5;e>1&&(e=1),t.style.opacity=e.toString()}else t.style.opacity="1";b||c>t.offsetTop&&(t.style.visibility="unset",_().then())}}break;case"introduce":if(p>.25){let t=(p-.25)/.5;t>1&&(t=1),i.forEach((e=>{e.style.opacity=""+(1-t)}))}else if(d<=.25){let t=d/.25;t>1&&(t=1),i[0].style.opacity=t.toString()}else if(d<=.5){let t=d-1;t>1&&(t=1),i[1].style.opacity=t.toString()}else i.forEach((t=>{t.style.opacity="1"}));break;case"rule":if(p>.25){let t=(p-.25)/.5;t>1&&(t=1);const e=-t*$(window).width();i[0].style.left=`${e}px`,i[1].style.right=`${e}px`,i[2].style.opacity=""+(1-t)}else if(d<=.5){let t=d/.5;t>1&&(t=1);const e=-(1-t)*$(window).width();i[0].style.left=`${e}px`,i[1].style.right=`${e}px`,i[2].style.opacity=t.toString()}else i[0].style.left="0",i[1].style.right="0",i[2].style.opacity="1";break;case"join_us":if(d>.2&&d<=.4){let t=d-1;t>1&&(t=1),i[0].style.opacity=t.toString(),i[0].style.top=(1-t)*i[0].offsetTop+"px",i[1].style.opacity=t.toString(),i[1].style.bottom=(1-t)*i[0].offsetTop+"px"}else if(d<=.55){i[0].style.opacity="1",i[0].style.top="0",i[1].style.opacity="1",i[1].style.bottom="0";let t=d-.4/.15;t>1&&(t=1),i[2].style.opacity=t.toString()}else if(d<=.7){i[0].style.opacity="1",i[0].style.top="0",i[1].style.opacity="1",i[1].style.bottom="0",i[2].style.opacity="1";let t=d-.55/.15;t>1&&(t=1),i[3].style.opacity=t.toString()}else if(d<=.85){i[0].style.opacity="1",i[0].style.top="0",i[1].style.opacity="1",i[1].style.bottom="0",i[2].style.opacity="1",i[3].style.opacity="1";let t=d-.7/.15;t>1&&(t=1),i[4].style.opacity=t.toString()}else d<=.2?e.join_us.restoreFunc(i):(i[0].style.opacity="1",i[0].style.top="0",i[1].style.opacity="1",i[1].style.bottom="0",i[2].style.opacity="1",i[3].style.opacity="1",i[4].style.opacity="1")}}e[t[n]].isChange=!0}else e[t[n]].isChange&&(e[t[n]].isChange=!1,e[t[n]].restoreFunc(o(t[n])))}}}return!1}))}}));let v=!1,b=!1,j=!1;function _(){return x(this,void 0,void 0,(function*(){if(v&&!b){b=!0;const t=600,e=document.querySelectorAll(".photo_sub2_pbgCard"),o={parent:document.getElementById("photo_sub2"),tmp1:document.getElementById("photo_sub2_piston-template1"),"1-1":document.getElementById("photo_sub2_piston1-1"),"1-2":document.getElementById("photo_sub2_piston1-2"),"2-1":document.getElementById("photo_sub2_piston2-1"),"2-2-1":document.getElementById("photo_sub2_piston2-2-1"),"2-2-2":document.getElementById("photo_sub2_piston2-2-2")};let n=0;function i(t,e){let o=t;return o++,o<e||(o=0),o}for(;!j;){o["2-2-1"].style.left=o["2-1"].style.left,o["2-2-2"].style.left=`${o["2-2-1"].offsetWidth+o["2-1"].offsetLeft}px`;{const s=-e[n].offsetWidth;e[n].style.transition="unset",e[n].style.left=`${s}px`,e[n].style.bottom=o.parent.offsetHeight-e[n].offsetHeight+"px";{const a=s-o["2-2-1"].offsetWidth;o["1-1"].style.left=`${a}px`,o["1-2"].style.left=`${a}px`}}yield w(t),e[n].style.transition="",o["1-1"].style.left="0",o["1-2"].style.left="0",e[n].style.left=`${o["2-2-1"].offsetWidth}px`,yield w(t),o["1-2"].style.left=`${o.tmp1.offsetHeight}px`,e[n].style.left=`${o.tmp1.offsetHeight+o["2-2-1"].offsetWidth}px`,yield w(t),o["1-2"].style.left="0",e[n].style.bottom="0",yield w(t),o["1-1"].style.left=-o["2-2-1"].offsetWidth+"px",o["1-2"].style.left=-o["2-2-1"].offsetWidth+"px",o["2-2-1"].style.left=`${o.tmp1.offsetHeight+o["2-1"].offsetLeft}px`,o["2-2-2"].style.left=`${o.tmp1.offsetHeight+o["2-2-1"].offsetWidth+o["2-1"].offsetLeft}px`;{let l=n;for(let c=0;c<e.length;c++)e[l].style.left=`${e[l].offsetLeft+e[l].offsetWidth}px`,l--,l<0&&(l=e.length-1)}yield w(t),n=i(n,e.length)}j=!1,b=!1}}))}var E;function B(){if(null==E){const t=function(){const t="resourceMode=",e=document.cookie.split(";");for(let o=0;o<e.length;o++){let n=e[o];for(;" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(t))return n.substring(13,n.length)}return null}();E=null!=t?t:"normal"}return E}function I(t,e=!1){e||function(t,e){let o="";{const t=new Date;t.setTime(t.getTime()+6048e5),o="; expires="+t.toUTCString()}document.cookie="resourceMode="+(e||"")+o+"; path=/"}(0,t),E=t}function T(t){I(t),k(t)}async function k(t){{const e=document.querySelectorAll(".video-page_video-box");{const o=["//player.bilibili.com/player.html?aid=113259596223254&bvid=BV16j1qYdE2U&cid=26166823217&page=1&high_quality=1&danmaku=0&autoplay=0","//player.bilibili.com/player.html?aid=113481005274537&bvid=BV1FCULY6Eoq&cid=26757105167&page=1&high_quality=1&danmaku=0&autoplay=0"];let n=0;e.forEach((e=>{e.innerHTML="low"===t?'<p style="text-align: center;width: 100%;position: relative">省流模式下将不会加载宣传视频</p>':'<div class="card" style="z-index: 1; position: relative;height: 100%;width: 100%;">\n    <iframe src="'+o[n]+'" class="card-img-top rounded" style="height: 100%;width: 100%;" \nallowfullscreen="allowfullscreen"  scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"></iframe>\n</div>\n',n++}))}}{function i(t){return new Promise(((e,o)=>{fetch(t).then((t=>t.text())).then((t=>{e(t)})).catch((()=>{o(new Error("文本资源'{path}'加载失败"))}))}))}const s=[["assets/md/index/serverRule.md","ruleText"],["assets/md/index/serverIntroductory.md","serverIntroductoryText"],["assets/md/index/joinUs.md","joinUsText"],["assets/md/index/joinUsText2.md","joinUsText2"]];for(let a=0;a<s.length;a++)document.getElementById(s[a][1]).innerHTML=marked.parse(await i(s[a][0]))}{function l(t,e=t=>{}){return new Promise(((o,n)=>{const i=new Image;i.onload=()=>{o(i),e(!0)},i.onerror=()=>{n(new Error(`图片资源"${t}"加载失败`)),e(!1)},i.src=t}))}{let c;switch(t){case"source":c=["http://cdnjson.com/images/2025/01/13/main2-light.png","http://cdnjson.com/images/2025/01/13/main2-dark.png","http://cdnjson.com/images/2025/03/19/bg1-light.png"];break;case"low":c=["http://cdnjson.com/images/2025/03/18/main2-light-low2.png","http://cdnjson.com/images/2025/03/18/main2-dark-low2.png","http://cdnjson.com/images/2025/03/19/bg1-light-low2.jpg"];break;default:c=["http://cdnjson.com/images/2025/01/15/main2-light-low.png","http://cdnjson.com/images/2025/01/15/main2-dark-low.png","http://cdnjson.com/images/2025/03/19/bg1-light-low.jpg"]}for(let r=0;r<c.length;r++)try{if(await l(c[r]),r<=1){let d;switch(r){case 0:d="--home-wrapper_img-url_light";break;case 1:d="--home-wrapper_img-url_dark"}document.documentElement.style.setProperty(d,`url(${c[r]})`)}else 2===r&&(document.getElementById("main-background_img").src=c[r])}catch{}}{async function p(t,e,o){for(let e=0;e<t.length;e++)o[e].setAttribute("data-show",!0);for(let n=0;n<t.length;n++)try{await l(t[n],(t=>{o[n].setAttribute("data-show",!1)}))}catch{}finally{e[n].src=t[n]}}{let m;switch(t){case"source":m=["http://cdnjson.com/images/2025/03/18/photo-21.png","http://cdnjson.com/images/2024/12/28/photo-2.png","http://cdnjson.com/images/2024/12/28/photo-18.png","http://cdnjson.com/images/2024/12/28/photo-15.png","http://cdnjson.com/images/2024/12/28/photo-17.png","http://cdnjson.com/images/2025/03/18/photo-22.png","http://cdnjson.com/images/2024/12/28/photo-6.png","http://cdnjson.com/images/2024/12/28/photo-5.png","http://cdnjson.com/images/2025/03/18/photo-23.png","http://cdnjson.com/images/2025/03/18/photo-24.png","http://cdnjson.com/images/2025/03/18/photo-25.png","http://cdnjson.com/images/2024/12/28/photo-7.png","http://cdnjson.com/images/2024/12/28/photo-8.png","http://cdnjson.com/images/2024/12/28/photo-9.png","http://cdnjson.com/images/2024/12/28/photo-10.png","http://cdnjson.com/images/2024/12/28/photo-11.png","http://cdnjson.com/images/2024/12/28/photo-12.png","http://cdnjson.com/images/2024/12/28/photo-19.png","http://cdnjson.com/images/2024/12/28/photo-20.png","http://cdnjson.com/images/2024/12/28/photo-13.png","http://cdnjson.com/images/2024/12/28/photo-14.png"];break;case"low":m=["http://cdnjson.com/images/2025/03/18/photo-21-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-2-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-18-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-15-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-17-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-22-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-6-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-5-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-23-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-24-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-25-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-7-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-8-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-9-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-10-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-11-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-12-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-19-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-20-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-13-low2.jpg","http://cdnjson.com/images/2025/03/18/photo-14-low2.jpg"];break;default:m=["http://cdnjson.com/images/2025/03/18/photo-21-low.jpg","http://cdnjson.com/images/2025/01/15/photo-2-low.jpg","http://cdnjson.com/images/2025/01/15/photo-18-low.jpg","http://cdnjson.com/images/2025/01/15/photo-15-low.jpg","http://cdnjson.com/images/2025/01/15/photo-17-low.jpg","http://cdnjson.com/images/2025/03/18/photo-22-low.jpg","http://cdnjson.com/images/2025/01/15/photo-6-low.jpg","http://cdnjson.com/images/2025/01/15/photo-5-low.jpg","http://cdnjson.com/images/2025/03/18/photo-23-low.jpg","http://cdnjson.com/images/2025/03/18/photo-24-low.jpg","http://cdnjson.com/images/2025/03/18/photo-25-low.jpg","http://cdnjson.com/images/2025/01/15/photo-7-low.jpg","http://cdnjson.com/images/2025/01/15/photo-8-low.jpg","http://cdnjson.com/images/2025/01/15/photo-9-low.jpg","http://cdnjson.com/images/2025/01/15/photo-10-low.jpg","http://cdnjson.com/images/2025/01/15/photo-11-low.jpg","http://cdnjson.com/images/2025/01/15/photo-12-low.jpg","http://cdnjson.com/images/2025/01/15/photo-19-low.jpg","http://cdnjson.com/images/2025/01/15/photo-20-low.jpg","http://cdnjson.com/images/2025/01/15/photo-13-low.jpg","http://cdnjson.com/images/2025/01/15/photo-14-low.jpg"]}await p(m,document.querySelectorAll(".photoBoxGroup-1:not(.loadingBox)"),document.querySelectorAll(".loadingBox.photoBoxGroup-1")),function(){const t=document.querySelectorAll(".photo_sub2_pbgCard");document.getElementById("photo_sub2").style.height=2.5*t[0].offsetHeight+"px";{const t=document.getElementById("photo_sub2_piston2-1");t.style.left=-(t.offsetHeight-document.getElementById("photo_sub2_piston-template1").offsetHeight)+"px";const e=document.getElementById("photo_sub2_piston2-2-1");e.style.left=t.style.left,document.getElementById("photo_sub2_piston2-2-2").style.left=`${e.offsetWidth+t.offsetLeft}px`}t.forEach((t=>{t.style.left=`${$(window).width()}px`})),v=!0}()}{let h;switch(t){case"source":h=["assets/img/copy/qqGroupQRcode.png"];break;case"low":h=["assets/img/copy/qqGroupQRcode-low2.png"];break;default:h=["assets/img/copy/qqGroupQRcode-low.png"]}await p(h,document.querySelectorAll(".photoBoxGroup-2:not(.loadingBox)"),document.querySelectorAll(".loadingBox.photoBoxGroup-2"))}}}LoadingOver()}document.addEventListener("DOMContentLoaded",(function(){C()}));var S=!1,M=!1,L=!1;function C(){if(!S&&!M&&!L){S=!0,M=!0;const r={l:0,f:1,s:2,hf:3,hs:4};var t,e,o,n,i,s,a=getComputedStyle(document.querySelector("#pingServerView"));e=a.getPropertyValue("--pingServerState-loading"),o=a.getPropertyValue("--pingServerState-failed"),n=a.getPropertyValue("--pingServerState-succeed"),i=a.getPropertyValue("--pingServerState-halfFailed"),s=a.getPropertyValue("--pingServerState-succeed");var l=document.getElementById("pingServerLoader"),c=document.getElementById("pingServerText");function d(){L=!0,l.addEventListener("animationiteration",(function t(){l.style.animationIterationCount=0,l.removeEventListener("animationiteration",t),L=!1}))}function p(a){switch(a){case 0:t=r.l,l.style.background=e,c.style.color=e,l.style.animation="pingServerLoader_loop 1s infinite forwards",c.innerText="正在检测服务器在线状态......";break;case 1:t=r.hf,l.style.background=i,c.style.color=i,c.innerText="尝试用备用方案检测在线状态......";break;case 2:t=r.hs,l.style.background=s,c.style.color=s,c.innerText="与MC服务器的连接正常";break;case 3:t=r.s,l.style.background=n,c.style.color=n,c.innerText="Minecraft服务器在线";break;case 4:case 5:case 6:case 7:switch(t=r.f,l.style.background=o,c.style.color=o,a){case 4:c.innerText="Minecraft服务器已离线";break;case 5:c.innerText="Minecraft服务器请求超时";break;case 6:c.innerText="在线状态检查失败，请稍后尝试";break;case 7:c.innerText="当前网络无法连接至MC服务器"}}}function m(e=null,o=null){null!=e?200==e.code?(p(3),document.getElementById("pingServerInfo_icon").src=e.img,document.getElementById("pingServerInfo_text_player").innerText="玩家数: "+e.players,document.getElementById("pingServerInfo_text_motd1").innerText=e.motd,document.getElementById("pingServerInfo_text_motd2").innerText=e.motd2,document.getElementById("pingServerInfo").style.display="flex",d()):S||t!=r.hf?S?p(1):t==r.hs&&d():(p(4),d()):S||t!=r.hf?S?p(1):t==r.hs&&d():(p("timeout"===o?5:6),d()),M=!1}p(0),$("#pingServerRootView").fadeIn(),new Ping({favicon:"/usePing.png",logError:!1,timeout:3e4}).ping("https://web.mjyy.top/minecraft/playerachievement/",(function(e){e?M||t!=r.hf?p(1):(p(7),d()):c.style.color!=n&&(p(2),M||d()),S=!1})),$.ajax({url:"https://proxy.cors.sh/https://uapis.cn/api/mcserver?server=113.219.237.106:30303",type:"GET",timeout:6e4,headers:{"X-Requested-With":"XMLHttpRequest","Access-Control-Allow-Origin":"*"},contentType:"application/json",success:function(t){m(t)},error:function(t){m(null,t)}})}}async function q(){let t=document.querySelector("html");window.matchMedia("(prefers-color-scheme: dark)").matches?t.setAttribute("data-theme","dark"):t.setAttribute("data-theme","light")}function A(){LoadingOver()}$((function(){q(),null!=navigator.connection&&("cellular"===navigator.connection.type?(showToast("检测到当前使用计费网络，已自动切换为省流模式",4e3,"main-toast"),SetResourceMode("low",!0)):"4g"!=navigator.connection.effectiveType&&showToast("检测到当前网络速度缓慢，请耐心等待",3500,"main-toast"));{const t=GetResourceMode();loadMediaResources(t).then((t=>{})),document.getElementById("resourceModeBox_select").value=t}})),o(812),o(757),l(t),l(e),l(n),l(i),l(s),l(a),window.ruleText_Button_Click=function(){const t=document.getElementById("ruleText_border");$("#ruleText_Button").fadeOut(),t.style.transition="unset",$("#ruleText_border").fadeIn(),(()=>{x(this,void 0,void 0,(function*(){yield w(500),t.style.transition=""}))})()}})()})();