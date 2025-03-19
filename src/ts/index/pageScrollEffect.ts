$(function (){
    let lastScrollTime = 0;
    $(window).scroll(function () {
        const nowScrollTime = Date.now();
        if (nowScrollTime - lastScrollTime > 100){//减缓触发频率，避免抖动，单位ms
            const mb:HTMLElement|null=document.getElementById("main-background_img");
            if (mb!=null) {
                const overflowValue:number=parseFloat(window.getComputedStyle(mb).width) - $(window).width()!;
                const scrollTop:number|undefined = $(window).scrollTop();
                const maxScrollTop:number|undefined = $(document).height()! - $(window).height()!;
                //if (scrollTop!=null && maxScrollTop!=null) {
                    mb!.style.left = `${(-((scrollTop / maxScrollTop) * overflowValue))}px`;
                //}
            }
        }
        return false;
    });
})