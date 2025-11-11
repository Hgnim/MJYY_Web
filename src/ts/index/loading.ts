import $ from 'jquery';
import {home_a_run} from "@/js/index/view_action";
import {sleep} from "@/ts/global/sleep";
import {lockScroll,unlockScroll} from "@/ts/global/scrollLock";
import {getCookie, setCookie} from "@/ts/global/cookie";

let isLoadingOver = false;
let loadingOverValue = 0;//加载结束数值，当加载阶段达到一定值后才算加载完毕
export function LoadingOver(addValue=1) {
    if (!isLoadingOver) {
        loadingOverValue = Number(loadingOverValue) + Number(addValue);
        if (loadingOverValue >= 2) {//当阶段达到2后则加载完毕
            isLoadingOver = true;
            bgSwap_Change_clear();
            $("#preloader").fadeOut("slow");
            home_a_run();
            // noinspection JSIgnoredPromiseFromCall
            waitToRemoveLoadingPage();

            unlockScroll();
        }
    }
}
async function waitToRemoveLoadingPage(){
    await sleep(3000);//为了优化网页，在结束加载页面后的一段时间后卸载元素
    document.getElementById("preloader")!.remove();
    //检查html后没有发现pace类的元素，故注释掉这一行。因为执行时会报错：can't access property "remove", document.getElementsByClassName(...)[0] is undefined
    //document.getElementsByClassName('pace')[0].remove();
}

//加载时间过长的话则显示跳过加载的按钮
async function WaitTimeOut(){
    //await sleep(5000);
    //开发分支中无需等待，直接弹出跳过加载按钮
    if(!isLoadingOver){
        $("#main-ld-skipbt").fadeIn();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    lockScroll();
    // noinspection JSIgnoredPromiseFromCall
    WaitTimeOut();

    {//bgswap 初始化
        const bgswap:HTMLInputElement|null = document.getElementById('main-ld-bgswap') as HTMLInputElement;
        if (bgswap) {
            const cok:string|null=getCookie("bgswapChecked");
            if (cok){
                switch (cok){
                    case '1':
                        // noinspection PointlessBooleanExpressionJS
                        if (bgswap.checked==false){
                            bgswap.checked=true;
                            bgSwap_Change();
                        }
                        break;
                    case '0':
                        // noinspection PointlessBooleanExpressionJS
                        if (bgswap.checked==true){
                            bgswap.checked=false;
                            bgSwap_Change();
                        }
                        break;
                }
            }
        }
    }

    const animationCssPath='assets/css/animation/';
    const animationCssInfo:any[][]=[
        ['spinning-coin.css','spinning-coin_animation',0],
        ['cube.css','cube_animation',6],
        ['bar-spin.css','bar-spin_animation',0],
        ['wind-up.css','wind-up_animation',0],
        ['push-pop.css','push-pop',2],
        ['pong.css','pong_animation',3],
        ['waterfall.css',"waterfall_animation",5],
        ['fk.css','fk_animation',2],
        ['follow-the-leader-line.css','follow-the-leader-line_animation',5],
        ['slide-in.css','slide-in_animation',3],
    ];

    //随机显示加载页面动画
    let randomInt;{
        let min = 0, max = animationCssInfo.length-1;
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        //randomInt=max;//仅用于调试
    }

    let newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.type = 'text/css';
    let newDiv = document.createElement('div');

    newLink.href =animationCssPath + animationCssInfo[randomInt][0];
    newDiv.className =animationCssInfo[randomInt][1];
    for (let i = 0; i < animationCssInfo[randomInt][2];i++)
        newDiv.appendChild(document.createElement('div'));

    document.head.appendChild(newLink);
    document.getElementById("main-ld-loader")!.appendChild(newDiv);
});

export function bgSwap_Change(){
    const preloader:HTMLElement|null =document.getElementById('preloader');
    const bgswap:HTMLInputElement|null = document.getElementById('main-ld-bgswap') as HTMLInputElement;
    if(preloader && bgswap) {
        preloader.style.transition= 'opacity 1.2s';
        function _setCookie(value:string){
            setCookie("bgswapChecked", value, 7);
        }
        switch (bgswap.checked) {
            case false:
                preloader.style.opacity='0.15';
                setTimeout(() => {
                    if (!bgswap.checked) {//等待后再次确认
                        preloader.style.pointerEvents = 'none';
                        unlockScroll();
                    }
                }, 1200);
                _setCookie('0');
                break;
            case true:
                preloader.style.opacity='unset';
                preloader.style.pointerEvents = 'unset';
                lockScroll();
                _setCookie('1');
                break;
        }
    }
}
function bgSwap_Change_clear(){
    //清除样式，否则无法显示淡出效果
    const preloader:HTMLElement|null =document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition= 'unset';
    }
}