import {home_a_run} from "@/js/index/view_action";

let isLoadingOver = false;
let loadingOverValue = 0;//加载结束数值，当加载阶段达到一定值后才算加载完毕
export function LoadingOver(addValue=1) {
    if (!isLoadingOver) {
        loadingOverValue = Number(loadingOverValue) + Number(addValue);
        if (loadingOverValue >= 2) {//当阶段达到2后则加载完毕
            isLoadingOver = true;
            $("#preloader").on(500).fadeOut();
            $(".preloader").on(600).fadeOut("slow");
            home_a_run();
            // noinspection JSIgnoredPromiseFromCall
            waitToRemoveLoadingPage();
        }
    }
}
export async function waitToRemoveLoadingPage(){
    await sleep(3000);//为了优化网页，在结束加载页面后的一段时间后卸载元素
    document.getElementById("preloader").remove();
    document.getElementsByClassName('pace')[0].remove();
}

//加载时间过长的话则显示跳过加载的按钮
export async function WaitTimeOut(){
    await sleep(5000);
    if(!isLoadingOver){
        $("#main-ld-skipbt").fadeIn();
    }
}



export function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}




document.addEventListener('DOMContentLoaded', function () {
    // noinspection JSIgnoredPromiseFromCall
    WaitTimeOut();

    const animationCssPath='assets/css/animation/';
    const animationCssInfo=[
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
    document.getElementById("main-ld-loader").appendChild(newDiv);
});