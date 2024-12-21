
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