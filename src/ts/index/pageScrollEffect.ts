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

                const currentBottomScroll = $(window).scrollTop()!+$(window).height()!;
                {
                    const section = document.getElementById("video_page");
                    if (section != null) {
                        const offsetTop: number = section.offsetTop;
                        const clientHeight:number=section.clientHeight;
                        const height:number = offsetTop+clientHeight;
                        if (currentBottomScroll >= offsetTop /*&& currentBottomScroll < height*/){
                            const xValue:number =currentBottomScroll-offsetTop;
                            const yValue:number= (1/((Math.floor(xValue / (clientHeight)) * 3000) + 2600)) * Math.pow(xValue-clientHeight,2);

                            console.log(`${xValue} ${yValue} ${offsetTop} ${height}`);

                            const obj1=document.getElementById("video-page_header");
                            const obj2=document.getElementById("video-page_video-box_1");
                            const obj3=document.getElementById("video-page_video-box_2");
                            if (obj1!=null) {
                                if (yValue>20)
                                    obj1.style.opacity = `${100 - yValue}%`;
                                else
                                    obj1.style.opacity='100%';
                            }
                            if (obj2!=null) {
                                if (yValue>20)
                                obj2.style.left = `-${yValue * 5}px`;
                                else
                                obj2.style.left = '0';
                            }
                            if (obj3!=null) {
                                if (yValue > 20)
                                    obj3.style.right = `-${yValue * 5}px`;
                                else
                                    obj3.style.right = '0';
                            }
                        }
                    }
                }

            }
            return false;
        });
    }
})