$(function (){
    //const allSections = document.querySelectorAll('section');
    {
        let lastScrollTime = 0;
        $(window).scroll(function () {
            const nowScrollTime = Date.now();
            if (nowScrollTime - lastScrollTime > 64) {//减缓触发频率，避免可能的运动抖动和高频计算，单位ms
                lastScrollTime=nowScrollTime;
                const mb: HTMLElement | null = document.getElementById("main-background_img");
                if (mb != null) {
                    const overflowValue: number = parseFloat(window.getComputedStyle(mb).width) - $(window).width()!;
                    const scrollTop: number | undefined = $(window).scrollTop();
                    const maxScrollTop: number | undefined = $(document).height()! - $(window).height()!;
                    //if (scrollTop!=null && maxScrollTop!=null) {
                    mb!.style.left = `${(-((scrollTop / maxScrollTop) * overflowValue))}px`;
                    //}
                }

                /*const sectionPoss: any[] = [];
                let currentSection:any|null=null;
                {
                    const currentBottomScroll = $(window).scrollTop()!+$(window).height()!;
                    allSections.forEach(section => {
                        sectionPoss.push({
                            id: section.id,
                            offsetTop: section.offsetTop,
                            height: section.clientHeight
                        });
                    });
                    let idNum:number=0;
                    sectionPoss.every(pos => {
                        const sectionTop = pos.offsetTop;
                        const sectionBottom = sectionTop + pos.height;

                        if (currentBottomScroll >= sectionTop && currentBottomScroll < sectionBottom) {
                            currentSection={
                                id: pos.id,
                                idNum:idNum,
                            };
                            return false;
                        } else {
                            idNum++;
                        }
                        return true;
                    });
                }
                console.log(currentSection);*/

                const currentTopScroll:number =$(window).scrollTop()!;
                const currentBottomScroll = $(window).scrollTop()!+$(window).height()!;
                const screenHeight:number = $(window).height();
                const screenWidth:number = $(window).width();
                {
                    const section = document.getElementById("video_page");
                    if (section != null) {
                        const offsetTop: number = section.offsetTop;
                        const clientHeight:number=section.clientHeight;
                        const height:number = offsetTop+clientHeight;
                        if (currentBottomScroll >= offsetTop && currentTopScroll < height){
                            const obj=[
                                document.getElementById("video-page_header"),
                                document.getElementById("video-page_video-box_1"),
                                document.getElementById("video-page_video-box_2"),
                            ];
                            const progressValue:number=(currentBottomScroll-offsetTop)/clientHeight;
                            const progressValue2:number = (currentTopScroll-offsetTop)/clientHeight;
                            if (obj[0]!=null && obj[1]!=null && obj[2]!=null) {
                                if (progressValue2>0.25){
                                    let v=(progressValue2-0.25)/0.5;
                                    if (v>1)v = 1;
                                    obj[0].style.opacity=`${1-v}`;

                                    {
                                        const v2:number=-(v * section.clientWidth);
                                        obj[1].style.left = `${v2}px`;
                                        obj[2].style.right = `${v2}px`;
                                    }
                                }
                                else if (progressValue<0.5){
                                    let v=(progressValue/0.5);
                                    if (v>1)v = 1;
                                    obj[0].style.opacity=v.toString();

                                    {
                                        const v2:number=-(section.clientWidth-(v * section.clientWidth));
                                        obj[1].style.left = `${v2}px`;
                                        obj[2].style.right = `${v2}px`;
                                    }
                                }
                                else{
                                    obj[0].style.opacity='100%';
                                    obj[1].style.left = '0';
                                    obj[2].style.right = '0';
                                }
                            }
                            /*if (obj2!=null) {
                                if (yValue>funcMinValue)
                                    obj2.style.left = `-${yValue * 5}px`;
                                else
                                    obj2.style.left = '0';
                            }
                            if (obj3!=null) {
                                if (yValue > funcMinValue)
                                    obj3.style.right = `-${yValue * 5}px`;
                                else
                                    obj3.style.right = '0';
                            }*/
                        }
                    }
                }

            }
            return false;
        });
    }
})