
var isLoadingOver = false;
function LoadingOver() {
    if (!isLoadingOver) {
        isLoadingOver = true;
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
        waitToRemoveLoadingPage();
    }
}
async function waitToRemoveLoadingPage(){
    await sleep(3000);//为了优化网页，在结束加载页面后的一段时间后卸载元素
    document.getElementById("preloader").remove();
    document.getElementsByClassName('pace')[0].remove();
}

//加载时间过长的话则显示跳过加载的按钮
async function WaitTimeOut(){
    await sleep(5000);
    if(!isLoadingOver){
        $("#main-ld-skipbt").fadeIn();
    }
}



function sleep(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}

//以下是解决window.onload和body.onload两个函数冲突的方法
document.onreadystatechange =WaitTimeOut;

window.onload = LoadingOver;
if (document.all) {
    window.attachEvent('onload', LoadingOver)
}
else {
    window.addEventListener('load', LoadingOver, false);
}




document.addEventListener('DOMContentLoaded', function () {
    let randomInt;{
        let min = 0, max = 6;
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //randomInt = 6;
    let newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.type = 'text/css';
    let newDiv = document.createElement('div');
    switch (randomInt) {
        case 0:
            newLink.href = '../../css/animation/spinning-coin.css';
            newDiv.className = 'spinning-coin_animation';
            break;
        case 1:
            newLink.href = '../../css/animation/cube.css';
            newDiv.className = 'cube_animation';
            for (i = 0; i < 6;i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 2:
            newLink.href = '../../css/animation/bar-spin.css';
            newDiv.className = 'bar-spin_animation';
            break;
        case 3:
            newLink.href = '../../css/animation/wind-up.css';
            newDiv.className = 'wind-up_animation';
            break;
        case 4:
            newLink.href = '../../css/animation/push-pop.css';
            newDiv.className = 'push-pop';
            for (i = 0; i < 2; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 5:
            newLink.href = '../../css/animation/pong.css';
            newDiv.className = 'pong_animation';
            for (i = 0; i < 3; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 6:
            newLink.href = '../../css/animation/waterfall.css';
            newDiv.className = "waterfall_animation";
            for (i = 0; i < 5; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
    }
    document.head.appendChild(newLink);
    document.getElementById("main-ld-loader").appendChild(newDiv);
});