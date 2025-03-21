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

                const screenHeight:number = $(window).height();
                const screenWidth:number = $(window).width();
                const currentTopScroll:number =$(window).scrollTop()!;
                const currentBottomScroll = currentTopScroll+screenHeight;
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
                        }
                    }
                }
                {
                    const section:HTMLElement|null = document.getElementById("photo");
                    if (section != null) {
                        const offsetTop: number = section.offsetTop;
                        const clientHeight:number=section.clientHeight;
                        const height:number = offsetTop+clientHeight;
                        if (currentBottomScroll >= offsetTop && currentTopScroll < height){
                            {
                                const sectionSub:HTMLElement|null = document.getElementById("photo_sub1");
                                if (sectionSub!=null) {
                                    const offsetTopSub: number = sectionSub.offsetTop;
                                    const clientHeightSub: number = sectionSub.clientHeight;
                                    const heightSub: number = offsetTopSub + clientHeightSub;

                                    const obj:HTMLElement[]=[
                                        document.getElementById("photo_sub1_title")!,
                                        document.getElementById("photo_sub1_photoBox1")!,
                                        document.getElementById("photo_sub1_photoBox2")!,
                                        document.getElementById("photo_sub1_photoBox3")!,
                                    ];
                                    const progressValueSub:number=(currentBottomScroll-offsetTopSub)/clientHeightSub;
                                    const progressValueSub2:number = (currentTopScroll-offsetTopSub)/clientHeightSub;

                                    if (progressValueSub2>0.8){
                                        let v=(progressValueSub2-0.8)/0.2;
                                        if (v>1)v = 1;

                                        obj.forEach((o:HTMLElement) => {
                                            o.style.opacity=(1-v).toString();
                                        });
                                    }
                                    else if (progressValueSub>0.25 && progressValueSub<0.5) {
                                        if (progressValueSub<0.34){
                                            let v=(progressValueSub-0.25)/0.8;
                                            if (v>1)v = 1;

                                            obj[1].style.opacity=v.toString();
                                            obj[1].style.top = `${(1-v)*obj[1].offsetHeight}px`;
                                        }else if (progressValueSub<0.42){
                                            let v=(progressValueSub-0.33)/0.8;
                                            if (v>1)v = 1;

                                            obj[1].style.opacity='1';
                                            obj[1].style.top = '0';

                                            obj[2].style.opacity=v.toString();
                                            obj[2].style.top = `${(1-v)*obj[2].offsetHeight}px`;

                                            obj[0].style.left=`-${(1-v)*screenWidth}px`;
                                        }else{
                                            let v=(progressValueSub-0.41)/0.8;
                                            if (v>1)v = 1;

                                            obj[0].style.left='0';

                                            obj[1].style.opacity='1';
                                            obj[1].style.top = '0';

                                            obj[2].style.opacity='1';
                                            obj[2].style.top = '0';

                                            obj[3].style.opacity=v.toString();
                                            obj[3].style.top = `${(1-v)*obj[3].offsetHeight}px`;
                                        }
                                    }
                                    else if(progressValueSub>=0.5){
                                        obj[0].style.opacity='1';
                                        obj[0].style.left='0';

                                        obj[1].style.opacity='1';
                                        obj[1].style.top = '0';

                                        obj[2].style.opacity='1';
                                        obj[2].style.top = '0';

                                        obj[3].style.opacity='1';
                                        obj[3].style.top = '0';
                                    }
                                    else if (progressValueSub<=0.25){
                                        obj[0].style.left=`-${screenWidth}`;

                                        obj[1].style.opacity='0';
                                        obj[1].style.top = `${obj[1].offsetHeight}`;

                                        obj[2].style.opacity='0';
                                        obj[2].style.top = `${obj[2].offsetHeight}`;

                                        obj[3].style.opacity='0';
                                        obj[3].style.top = `${obj[3].offsetHeight}`;
                                    }
                                }
                            }
                            {

                            }
                        }
                    }
                }
            }
            return false;
        });
    }
})