export function redirectPage(targetHref:string){
    //console.log(`${document.referrer} ${document.referrer.includes(targetHref)}`)
    //判断是否有上一页且判断其是否为指定URL
    if (document.referrer && document.referrer.includes(targetHref)) {
        //console.log(`goback`);
        //返回上一页
        window.history.back();
    } else {
        //没有上一页则直接跳转
        window.location.href = targetHref;
    }
}