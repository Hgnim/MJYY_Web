
var isLoadingOver = false;
function LoadingOver() {
    if (!isLoadingOver) {
        isLoadingOver = true;
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
    }
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

//window.onload = LoadingOver;
if (document.all) {
    window.attachEvent('onload', LoadingOver)
}
else {
    window.addEventListener('load', LoadingOver, false);
}