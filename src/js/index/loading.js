
var isLoadingOver = false;
var loadingOverValue = 0;//加载结束数值，当加载阶段达到一定值后才算加载完毕
export function LoadingOver(addValue=1) {
    if (!isLoadingOver) {
        loadingOverValue = Number(loadingOverValue) + Number(addValue);
        if (loadingOverValue >= 2) {//当阶段达到2后则加载完毕
            isLoadingOver = true;
            $("#preloader").on(500).fadeOut();
            $(".preloader").on(600).fadeOut("slow");
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
    WaitTimeOut();

    //随机显示加载页面动画
    let randomInt;{
        let min = 0, max = 9;
        randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        //randomInt=max;//仅用于调试
    }

    let newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.type = 'text/css';
    let newDiv = document.createElement('div');
    switch (randomInt) {
        case 0:
            newLink.href = 'css/animation/spinning-coin.css';
            newDiv.className = 'spinning-coin_animation';
            break;
        case 1:
            newLink.href = 'css/animation/cube.css';
            newDiv.className = 'cube_animation';
            for (i = 0; i < 6;i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 2:
            newLink.href = 'css/animation/bar-spin.css';
            newDiv.className = 'bar-spin_animation';
            break;
        case 3:
            newLink.href = 'css/animation/wind-up.css';
            newDiv.className = 'wind-up_animation';
            break;
        case 4:
            newLink.href = 'css/animation/push-pop.css';
            newDiv.className = 'push-pop';
            for (i = 0; i < 2; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 5:
            newLink.href = 'css/animation/pong.css';
            newDiv.className = 'pong_animation';
            for (i = 0; i < 3; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 6:
            newLink.href = 'css/animation/waterfall.css';
            newDiv.className = "waterfall_animation";
            for (i = 0; i < 5; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 7:
            newLink.href = 'css/animation/fk.css';
            newDiv.className = 'fk_animation';
            for (let i = 0; i < 2; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 8:
            newLink.href = 'css/animation/follow-the-leader-line.css';
            newDiv.className = 'follow-the-leader-line_animation';
            for (let i = 0; i < 5; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
        case 9:
            newLink.href = 'css/animation/slide-in.css';
            newDiv.className = 'slide-in_animation';
            for (let i = 0; i < 3; i++)
                newDiv.appendChild(document.createElement('div'));
            break;
    }
    document.head.appendChild(newLink);
    document.getElementById("main-ld-loader").appendChild(newDiv);
});