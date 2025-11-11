import 'bootstrap';//辅助'jquery';
import $ from 'jquery';
import {sleep} from "@/ts/global/sleep";
import {getCookie,setCookie} from "@/ts/global/cookie";
import {isMobile} from "@/ts/global/deviceDetect";
import {effectCheckBox_Change} from "@/js/index/script";
//import {setMoreLineEffect} from "@/js/index/MoreLineEffect";
import {setImgFalling} from "@/js/index/imgFalling";

const allSectionIds = [
            "video_page",
            "photo",
            "introduce",
            "rule",
            "join_us",
        ];
        const sectionStats={
            "video_page": {
                isChange: false,//如果对象被更改了，则设置为true
                restoreFunc: function (obj:(HTMLElement|null)[]){
                    //还原其中所有对象的属性至动画开始前
                    //避免快速滚动时导致动画组件没有恢复到初始状态
                    obj[0]!.style.opacity = '0';
                    obj[1]!.style.left = `${-$(window).width()!}px`;
                    obj[2]!.style.right = `${-$(window).width()!}px`;
                },
                finishFunc:function (obj:(HTMLElement|null)[]){
                    //将其中的对象属性更改至完成状态
                    //为禁用视觉效果选项服务
                    obj[0]!.style.opacity = '1';
                    obj[1]!.style.left = `0px`;
                    obj[2]!.style.right = `0px`;
                },
            },
            "photo": {
                isChange: false,
                restoreFunc: function (obj:(HTMLElement|null)[]|null,subId:number=0){
                    const allDo=(subId == 0);
                    while (allDo) {
                        if (allDo) subId++;
                        switch (subId) {
                            case 1:
                                if(allDo)
                                    obj = getSubObj("photo_sub1");

                                if (obj!=null) {
                                    obj[0]!.style.left = `${-$(window).width()!}px`;

                                    obj[1]!.style.opacity = '0';
                                    obj[1]!.style.top = `${obj[1]!.offsetHeight}px`;

                                    obj[2]!.style.opacity = '0';
                                    obj[2]!.style.top = `${obj[2]!.offsetHeight}px`;

                                    obj[3]!.style.opacity = '0';
                                    obj[3]!.style.top = `${obj[3]!.offsetHeight}px`;
                                }
                                break;
                            case 2:
                                if(allDo)
                                    obj = getSubObj("photo_sub2");

                                if (obj!=null) {
                                    obj[0]!.style.opacity = '0';
                                }
                                break;
                        }
                        if(allDo && !(subId<2))break;
                    }
                },
                finishFunc:function (obj:(HTMLElement|null)[]|null,subId:number=0){
                    const allDo=(subId == 0);
                    while (allDo) {
                        if (allDo) subId++;
                        switch (subId) {
                            case 1:
                                if(allDo)
                                    obj = getSubObj("photo_sub1");

                                if (obj!=null) {
                                    obj[0]!.style.left = `0px`;

                                    obj[1]!.style.opacity = '1';
                                    obj[1]!.style.top = `0px`;

                                    obj[2]!.style.opacity = '1';
                                    obj[2]!.style.top = `0px`;

                                    obj[3]!.style.opacity = '1';
                                    obj[3]!.style.top = `0px`;
                                }
                                break;
                            case 2:
                                if(allDo)
                                    obj = getSubObj("photo_sub2");

                                if (obj!=null) {
                                    obj[0]!.style.opacity = '1';
                                }
                                break;
                        }
                        if(allDo && !(subId<2))break;
                    }
                },
            },
            "introduce": {
                isChange: false,
                restoreFunc: function (obj:(HTMLElement|null)[]){
                    obj.forEach((o: HTMLElement | null) => {
                        o!.style.opacity = '0';
                    });
                },
                finishFunc:function (obj:(HTMLElement|null)[]){
                    obj.forEach((o: HTMLElement | null) => {
                        o!.style.opacity = '1';
                    });
                },
            },
            "rule": {
                isChange: false,
                restoreFunc: function (obj:(HTMLElement|null)[]){
                    obj[0]!.style.left=`${-$(window).width()!}px`;
                    obj[1]!.style.right=`${-$(window).width()!}px`;
                    obj[2]!.style.opacity='0';
                },
                finishFunc:function(obj:(HTMLElement|null)[]){
                    obj[0]!.style.left='0';
                    obj[1]!.style.right='0';
                    obj[2]!.style.opacity='1';
                },
            },
            "join_us": {
                isChange: false,
                restoreFunc: function (obj:(HTMLElement|null)[]){
                    obj[0]!.style.opacity='0';
                    obj[0]!.style.top=`${obj[0]!.offsetTop}px`;
                    obj[1]!.style.opacity='0';
                    obj[1]!.style.bottom=`${obj[0]!.offsetTop}px`;
                    obj[2]!.style.opacity='0';
                    obj[3]!.style.opacity='0';
                    obj[5]!.style.opacity='0';
                    obj[4]!.style.opacity='0';
                },
                finishFunc:function(obj:(HTMLElement|null)[]){
                    obj[0]!.style.opacity='1';
                    obj[0]!.style.top=`0px`;
                    obj[1]!.style.opacity='1';
                    obj[1]!.style.bottom=`0px`;
                    obj[2]!.style.opacity='1';
                    obj[3]!.style.opacity='1';
                    obj[5]!.style.opacity='1';
                    obj[4]!.style.opacity='1';
                },
            },
        };
        function getSubObj(sectionId:string){
            let obj:(HTMLElement|null)[]|null=null;
            switch (sectionId) {
                case "video_page":
                    obj = [
                        document.getElementById("video-page_header"),
                        document.getElementById("video-page_video-box_1"),
                        document.getElementById("video-page_video-box_2"),
                    ];
                    break;
                case "photo":
                    obj = [];
                    break;
                case "photo_sub1":
                    obj = [
                        document.getElementById("photo_sub1_title")!,
                        document.getElementById("photo_sub1_photoBox1")!,
                        document.getElementById("photo_sub1_photoBox2")!,
                        document.getElementById("photo_sub1_photoBox3")!,
                    ];
                    break;
                case "photo_sub2":
                    obj = [
                        document.getElementById("photo_sub2"),
                    ]
                    break;
                case "introduce":
                    obj = [
                        document.getElementById("introduce_header")!,
                        document.getElementById("serverIntroductoryText_border")!,
                    ];
                    break;
                case "rule":
                    obj = [
                        document.getElementById("rule_header")!,
                        //document.getElementById("ruleText_Button")!,
                        (document.querySelectorAll("#ruleText_Button button")[0] as HTMLElement)!,
                        document.getElementById("ruleText_border")!,
                    ];
                    break;
                case "join_us":
                    obj = [
                        document.getElementById("join_us_header_logo")!,
                        document.getElementById("join_us_header_text")!,
                        document.getElementById("joinUsText")!,
                        document.getElementById("joinUs_qgQRCode")!,
                        document.getElementById("joinUsText2")!,
                        document.getElementById("joinUs_qdQRCode")!,
                    ];
                    break;
            }
            return obj;
        }
        let lastScrollTime = 0;
        function scrollEffect() {
            const nowScrollTime = Date.now();
            if (nowScrollTime - lastScrollTime > 24) {//减缓触发频率，避免可能的运动抖动和高频计算，单位ms
                lastScrollTime=nowScrollTime;

                {
                    const mb: HTMLElement | null = document.getElementById("main-background_img");
                    if (mb != null) {
                        const overflowValue: number = parseFloat(window.getComputedStyle(mb).width) - $(window).width()!;
                        const scrollTop: number | undefined = $(window).scrollTop();
                        const maxScrollTop: number | undefined = $(document).height()! - $(window).height()!;
                        if (scrollTop!=null && maxScrollTop!=null) {
                        mb!.style.left = `${(-((scrollTop / maxScrollTop) * overflowValue))}px`;
                        }
                    }
                }

                const screenHeight:number |undefined = $(window).height();
                const screenWidth:number|undefined  = $(window).width();
                const currentTopScroll:number =$(window).scrollTop()!;
                const currentBottomScroll:number = currentTopScroll+screenHeight!;

                for (let si=0;si<allSectionIds.length;si++){
                    const section = document.getElementById(allSectionIds[si]);
                    if (section != null) {
                        const offsetTop: number = section.offsetTop;
                        const clientHeight:number=section.clientHeight;
                        const height:number = offsetTop+clientHeight;
                        if (currentBottomScroll >= offsetTop && currentTopScroll < height){
                            switch (allSectionIds[si]) {
                                default:
                                {
                                    const obj:(HTMLElement|null)[]|null= getSubObj(allSectionIds[si]);

                                    const progressValue: number = (currentBottomScroll - offsetTop) / clientHeight;
                                    const progressValue2: number = (currentTopScroll - offsetTop) / clientHeight;
                                    if (obj!=null) {
                                        switch (allSectionIds[si]) {
                                            case "video_page":
                                                if (obj[0] != null && obj[1] != null && obj[2] != null) {
                                                    if (progressValue2 > 0.25) {
                                                        let v = (progressValue2 - 0.25) / 0.5;
                                                        if (v > 1) v = 1;
                                                        obj[0].style.opacity = `${1 - v}`;

                                                        {
                                                            const v2: number = -(v * $(window).width()!);
                                                            obj[1].style.left = `${v2}px`;
                                                            obj[2].style.right = `${v2}px`;
                                                        }
                                                    } else if (progressValue <= 0.5) {
                                                        let v = (progressValue / 0.5);
                                                        if (v > 1) v = 1;
                                                        obj[0].style.opacity = v.toString();

                                                        {
                                                            const v2: number = -($(window).width()! - (v * $(window).width()!));
                                                            obj[1].style.left = `${v2}px`;
                                                            obj[2].style.right = `${v2}px`;
                                                        }
                                                    } else {
                                                        obj[0].style.opacity = '100%';
                                                        obj[1].style.left = '0';
                                                        obj[2].style.right = '0';
                                                    }
                                                }
                                                break;
                                            case "photo": {
                                                {
                                                    const sectionSub:HTMLElement|null = document.getElementById("photo_sub1");
                                                    if (sectionSub!=null) {
                                                        const offsetTopSub: number = sectionSub.offsetTop;
                                                        const clientHeightSub: number = sectionSub.clientHeight;
                                                        //const heightSub: number = offsetTopSub + clientHeightSub;

                                                        const objsub:(HTMLElement|null)[]|null=getSubObj("photo_sub1");

                                                        const progressValueSub:number=(currentBottomScroll-offsetTopSub)/clientHeightSub;
                                                        const progressValueSub2:number = (currentTopScroll-offsetTopSub)/clientHeightSub;

                                                        if (objsub!=null) {
                                                            if (progressValueSub2 > 0.8) {
                                                                let v = (progressValueSub2 - 0.8) / 0.2;
                                                                if (v > 1) v = 1;

                                                                objsub.forEach((o: HTMLElement|null) => {
                                                                    o!.style.opacity = (1 - v).toString();
                                                                });
                                                            }
                                                            else if (progressValueSub > 0.25 && progressValueSub < 0.5) {
                                                                if (progressValueSub < 0.34) {
                                                                    let v = (progressValueSub - 0.25) / 0.8;
                                                                    if (v > 1) v = 1;

                                                                    objsub[1]!.style.opacity = v.toString();
                                                                    objsub[1]!.style.top = `${(1 - v) * objsub[1]!.offsetHeight}px`;
                                                                } else if (progressValueSub < 0.42) {
                                                                    let v = (progressValueSub - 0.33) / 0.8;
                                                                    if (v > 1) v = 1;

                                                                    objsub[1]!.style.opacity = '1';
                                                                    objsub[1]!.style.top = '0';

                                                                    objsub[2]!.style.opacity = v.toString();
                                                                    objsub[2]!.style.top = `${(1 - v) * objsub[2]!.offsetHeight}px`;

                                                                    objsub[0]!.style.left = `-${(1 - v) * screenWidth!}px`;
                                                                } else {
                                                                    let v = (progressValueSub - 0.41) / 0.8;
                                                                    if (v > 1) v = 1;

                                                                    objsub[0]!.style.left = '0';

                                                                    objsub[1]!.style.opacity = '1';
                                                                    objsub[1]!.style.top = '0';

                                                                    objsub[2]!.style.opacity = '1';
                                                                    objsub[2]!.style.top = '0';

                                                                    objsub[3]!.style.opacity = v.toString();
                                                                    objsub[3]!.style.top = `${(1 - v) * objsub[3]!.offsetHeight}px`;
                                                                }
                                                            }
                                                            else if (progressValueSub >= 0.5) {
                                                                objsub[0]!.style.opacity = '1';
                                                                objsub[0]!.style.left = '0';

                                                                objsub[1]!.style.opacity = '1';
                                                                objsub[1]!.style.top = '0';

                                                                objsub[2]!.style.opacity = '1';
                                                                objsub[2]!.style.top = '0';

                                                                objsub[3]!.style.opacity = '1';
                                                                objsub[3]!.style.top = '0';
                                                            }
                                                            else if (progressValueSub <= 0.25) {
                                                                /*objsub[0]!.style.left = `-${screenWidth}`;

                                                                objsub[1]!.style.opacity = '0';
                                                                objsub[1]!.style.top = `${objsub[1]!.offsetHeight}`;

                                                                objsub[2]!.style.opacity = '0';
                                                                objsub[2]!.style.top = `${objsub[2]!.offsetHeight}`;

                                                                objsub[3]!.style.opacity = '0';
                                                                objsub[3]!.style.top = `${objsub[3]!.offsetHeight}`;*/
                                                                sectionStats["photo"]["restoreFunc"](objsub,1);
                                                            }
                                                        }
                                                    }
                                                }
                                                pistonPushPhotoAnim_Spawn(currentTopScroll,currentBottomScroll);
                                            }
                                                break;
                                            case "introduce": {
                                                if (progressValue2 > 0.25) {
                                                    let v = (progressValue2 - 0.25) / 0.5;
                                                    if (v > 1) v = 1;
                                                    obj.forEach((o: HTMLElement | null) => {
                                                        o!.style.opacity = `${1 - v}`;
                                                    });
                                                } else if (progressValue <= 0.25) {
                                                    let v = (progressValue / 0.25);
                                                    if (v > 1) v = 1;
                                                    obj[0]!.style.opacity = v.toString();
                                                } else if (progressValue <= 0.5) {
                                                    let v = (progressValue - 0.25 / 0.25);
                                                    if (v > 1) v = 1;
                                                    obj[1]!.style.opacity = v.toString();
                                                } else {
                                                    obj.forEach((o: HTMLElement | null) => {
                                                        o!.style.opacity = '1';
                                                    });
                                                }
                                            }break;
                                            case "rule":{
                                                if (progressValue2>0.25){
                                                    let v=(progressValue2-0.25)/0.5;
                                                    if (v>1)v = 1;
                                                    const pxv=-(v*$(window).width()!);
                                                    obj[0]!.style.left=`${pxv}px`;
                                                    obj[1]!.style.right=`${pxv}px`;
                                                    obj[2]!.style.opacity=`${1-v}`;
                                                }
                                                else if (progressValue<=0.5){
                                                    let v=(progressValue/0.5);
                                                    if (v>1)v = 1;
                                                    const pxv=-((1-v)*$(window).width()!);
                                                    obj[0]!.style.left=`${pxv}px`;
                                                    obj[1]!.style.right=`${pxv}px`;
                                                    obj[2]!.style.opacity=v.toString();
                                                }
                                                else{
                                                    obj[0]!.style.left='0';
                                                    obj[1]!.style.right='0';
                                                    obj[2]!.style.opacity='1';
                                                }
                                            }break;
                                            case "join_us":{
                                                if (progressValue>0.2 && progressValue<=0.4){
                                                    let v=(progressValue-0.2/0.2);
                                                    if (v>1)v = 1;
                                                    obj[0]!.style.opacity=v.toString();
                                                    obj[0]!.style.top = `${(1-v)*obj[0]!.clientHeight}px`;
                                                    obj[1]!.style.opacity=v.toString();
                                                    obj[1]!.style.bottom = `${(1-v)*obj[0]!.clientHeight}px`;
                                                }
                                                else if (progressValue<=0.55){
                                                    obj[0]!.style.opacity='1';
                                                    obj[0]!.style.top='0';
                                                    obj[1]!.style.opacity='1';
                                                    obj[1]!.style.bottom='0';

                                                    let v=(progressValue-0.4/0.15);
                                                    if (v>1)v = 1;
                                                    obj[2]!.style.opacity=v.toString();
                                                }
                                                else if (progressValue<=0.7){
                                                    obj[0]!.style.opacity='1';
                                                    obj[0]!.style.top='0';
                                                    obj[1]!.style.opacity='1';
                                                    obj[1]!.style.bottom='0';
                                                    obj[2]!.style.opacity='1';

                                                    let v=(progressValue-0.55/0.15);
                                                    if (v>1)v = 1;
                                                    obj[3]!.style.opacity=v.toString();
                                                    obj[5]!.style.opacity=v.toString();
                                                }
                                                else if (progressValue<=0.85){
                                                    obj[0]!.style.opacity='1';
                                                    obj[0]!.style.top='0';
                                                    obj[1]!.style.opacity='1';
                                                    obj[1]!.style.bottom='0';
                                                    obj[2]!.style.opacity='1';
                                                    obj[3]!.style.opacity='1';
                                                    obj[5]!.style.opacity='1';

                                                    let v=(progressValue-0.7/0.15);
                                                    if (v>1)v = 1;
                                                    obj[4]!.style.opacity=v.toString();
                                                }
                                                else if (progressValue<=0.2){
                                                    sectionStats["join_us"]["restoreFunc"](obj);
                                                }
                                                else{
                                                    obj[0]!.style.opacity='1';
                                                    obj[0]!.style.top='0';
                                                    obj[1]!.style.opacity='1';
                                                    obj[1]!.style.bottom='0';
                                                    obj[2]!.style.opacity='1';
                                                    obj[3]!.style.opacity='1';
                                                    obj[5]!.style.opacity='1';
                                                    obj[4]!.style.opacity='1';
                                                }
                                            }break;
                                        }
                                    }
                                }
                                    break;
                            }
                            //@ts-ignore: 7053
                            sectionStats[allSectionIds[si]]["isChange"]=true;
                        }
                        else if (//@ts-ignore: 7053
                            sectionStats[allSectionIds[si]]["isChange"]){
                            //@ts-ignore: 7053
                            sectionStats[allSectionIds[si]]["isChange"]=false;
                            //@ts-ignore: 7053
                            sectionStats[allSectionIds[si]]["restoreFunc"](getSubObj(allSectionIds[si]));
                        }
                    }
                }
            }
            return false;
        }

export function SetScrollEffect (enable: boolean=true) {
    setCookie("effectCheckBox", enable ? "true":"false" , 7);
    {
        function enableEffect(){
            $(window).on('scroll', scrollEffect);
        }
        function disableEffect(){
            $(window).off('scroll', scrollEffect);
            {
                allSectionIds.forEach(sectionId => {
                   const sections:(HTMLElement|null)[]|null = getSubObj(sectionId);
                   if (sections!=null) {
                       /*switch (sectionId) {
                           case "video_page":
                               sectionStats[sectionId].finishFunc(sections)
                               break;
                           case "photo":
                               sectionStats[sectionId].finishFunc(sections)
                               break;
                       }*/
                       sectionStats[sectionId as keyof typeof sectionStats]["finishFunc"](sections);
                   }
                });
            }
            {//禁用效果状态下，手动生成活塞推动图片动画元素
                async function runSpawn(){
                    while (true){
                        if (is_pistonPushPhotoAnim_Init){//等待初始化完成后再生成
                            pistonPushPhotoAnim_Spawn(null,null);
                            break;
                        }
                        await sleep(500);
                    }
                }
                runSpawn();
            }
        }

        if(enable)
            enableEffect();
        else
            disableEffect();
        //setMoreLineEffect(enable);
        setImgFalling(enable);
    }
}
export function GetScrollEffect():boolean {
    return (document.getElementById('effectCheckBox') as HTMLInputElement).checked;
}
export function GetScrollEffectFromCookieAndSet():boolean {
    function getValueFunc():boolean|null {
        const gc:string|null = getCookie("effectCheckBox");
        if (gc!=null)
            return (gc == "true");
        else
            return gc;
    }
    const getValue:boolean|null=getValueFunc();
    let outputValue:boolean;
    if(getValue!=null)
        outputValue = getValue;
    else
        outputValue=!isMobile;

    (document.getElementById('effectCheckBox') as HTMLInputElement).checked=outputValue;
    effectCheckBox_Change(outputValue);
    return outputValue;
}
//#region pistonPushPhotoAnim
//表示动画是否已完成初始化
let is_pistonPushPhotoAnim_Init:boolean=false;
//活塞推动照片动画初始化，需要在所需照片加载完后调用
export function pistonPushPhotoAnim_Init(){
    const allPhotoObjs:NodeListOf<HTMLElement>=document.querySelectorAll(".photo_sub2_pbgCard");
    document.getElementById('photo_sub2')!.style.height = `${allPhotoObjs[0].offsetHeight*2.5}px`;
    {
        //将底部活塞向左偏移一些，这样以保证下落的图片能精确落在粘液块右侧
        const p21=document.getElementById("photo_sub2_piston2-1")!;
        p21.style.left = `${-(p21.offsetHeight - document.getElementById("photo_sub2_piston-template1")!.offsetHeight)}px`
        const p221=document.getElementById("photo_sub2_piston2-2-1")!;
        p221.style.left = p21.style.left;
        document.getElementById("photo_sub2_piston2-2-2")!.style.left = `${p221.offsetWidth+p21.offsetLeft}px`;
    }

    allPhotoObjs.forEach((pobj)=>{
        pobj.style.left=`${$(window).width()}px`;
    });
    is_pistonPushPhotoAnim_Init=true;
}
class PistonPushPhotoAnim_Speed{
    private _def:number=600;
    get def():number{
        return this._def;
    }

    private _speed:number=this.def;
    get speed():number{
        return this._speed;
    }
    set speed(value:number){
        if (value>=1) {
            document.getElementById('photo_sub2')!.style.setProperty('--pistonPushPhotoAnim_speed', `${value}ms`);
            this._speed = value;
        }
    }
}
function pistonPushPhotoAnim_Spawn(currentTopScroll:null, currentBottomScroll:null):void;
function pistonPushPhotoAnim_Spawn(currentTopScroll:number, currentBottomScroll:number):void;
function pistonPushPhotoAnim_Spawn(currentTopScroll:any, currentBottomScroll:any):void{
    if (is_pistonPushPhotoAnim_Init) {
        const sectionSub: HTMLElement | null = document.getElementById("photo_sub2");
        if (sectionSub != null) {
            const offsetTopSub: number = sectionSub.offsetTop;
            const clientHeightSub: number = sectionSub.clientHeight;
            if(typeof currentTopScroll === "number" && typeof currentBottomScroll === "number") {
                //const heightSub: number = offsetTopSub + clientHeightSub;

                //const objsub:(HTMLElement|null)[]|null=getSubObj("photo_sub2");

                const progressValueSub: number = (currentBottomScroll - offsetTopSub) / clientHeightSub;
                const progressValueSub2: number = (currentTopScroll - offsetTopSub) / clientHeightSub;

                /*if (objsub!=null) {

                }*/

                if (progressValueSub2 > 0.8) {
                    let v = (progressValueSub2 - 0.8) / 0.2;
                    if (v > 1) v = 1;

                    sectionSub.style.opacity = (1 - v).toString();
                } else if (progressValueSub <= 0.5) {
                    let v = (progressValueSub) / 0.5;
                    if (v > 1) v = 1;

                    sectionSub.style.opacity = v.toString();
                } else {
                    sectionSub.style.opacity = '1';
                }

                if (!isStart_pistonPushPhotoAnim) {//启动动画
                    const offsetTopSub: number = sectionSub.offsetTop;
                    if (currentBottomScroll > offsetTopSub) {
                        sectionSub.style.visibility = 'unset';
                        //sectionSub.style.opacity = '1';
                        pistonPushPhotoAnim_Start().then();
                    }
                }
            }
            else{
                sectionSub.style.visibility = 'unset';
                sectionSub.style.opacity = '1';
                pistonPushPhotoAnim_Start().then();
            }
        }
    }
}
//在css过渡的时候进行的等待时间，也可也看作速度
const pistonPushPhotoAnim_speed=new PistonPushPhotoAnim_Speed();
//表示当前是否已经启动动画播放
let isStart_pistonPushPhotoAnim:boolean=false;
//设置为true后将停止当前正在执行的动画
let stop_pistonPushPhotoAnim:boolean=false;
//活塞推动照片动画启动
async function pistonPushPhotoAnim_Start(){
    if (is_pistonPushPhotoAnim_Init && !isStart_pistonPushPhotoAnim){
        isStart_pistonPushPhotoAnim=true;

        const allPhotoObjs:NodeListOf<HTMLElement>=document.querySelectorAll(".photo_sub2_pbgCard");
        const piston= {
            'parent':document.getElementById("photo_sub2")!,
            'tmp1':document.getElementById("photo_sub2_piston-template1")!,
            '1-1': document.getElementById("photo_sub2_piston1-1")!,
            '1-2': document.getElementById("photo_sub2_piston1-2")!,
            '2-1': document.getElementById("photo_sub2_piston2-1")!,
            //'2-2': document.getElementById("photo_sub2_piston2-2")!,
            '2-2-1': document.getElementById("photo_sub2_piston2-2-1")!,
            '2-2-2': document.getElementById("photo_sub2_piston2-2-2")!,
        };
        let pobjIndex:number=0;
        function indexAdd(index:number, max:number):number{
            let i=index;
            i++;
            if (!(i<max))
                i=0;
            return i;
        }
        while (!stop_pistonPushPhotoAnim){
            piston["2-2-1"].style.left = piston["2-1"].style.left;
            piston["2-2-2"].style.left = `${piston["2-2-1"].offsetWidth+piston["2-1"].offsetLeft}px`;
            {
                const lv1=-(allPhotoObjs[pobjIndex].offsetWidth);
                allPhotoObjs[pobjIndex].style.transition = 'unset';//取消过渡，避免图片回调时发生过渡。
                allPhotoObjs[pobjIndex].style.left = `${lv1}px`;
                allPhotoObjs[pobjIndex].style.bottom = `${piston.parent.offsetHeight-allPhotoObjs[pobjIndex].offsetHeight}px`;
                {
                    const lv2 = lv1 - piston["2-2-1"].offsetWidth;
                    piston["1-1"].style.left = `${lv2}px`;
                    piston["1-2"].style.left = `${lv2}px`;
                }
            }
            await sleep(pistonPushPhotoAnim_speed.speed);//等待过渡

            allPhotoObjs[pobjIndex].style.transition = '';//重新启用过渡（要等待后才能启用过渡，否则“取消过渡”就没效果了）
            piston["1-1"].style.left = '0';
            piston["1-2"].style.left = '0';
            allPhotoObjs[pobjIndex].style.left = `${piston["2-2-1"].offsetWidth}px`;
            await sleep(pistonPushPhotoAnim_speed.speed);

            piston["1-2"].style.left = `${piston["tmp1"].offsetHeight}px`;
            allPhotoObjs[pobjIndex].style.left = `${piston["tmp1"].offsetHeight+piston["2-2-1"].offsetWidth}px`;
            await sleep(pistonPushPhotoAnim_speed.speed);

            piston["1-2"].style.left = '0';
            allPhotoObjs[pobjIndex].style.bottom='0';
            //allPhotoObjs[pobjIndex].style.left=`${piston["2-2-1"].offsetWidth*2}px`;//已将底部活塞向左偏移了一些，所以图片下落时无需偏移
            await sleep(pistonPushPhotoAnim_speed.speed);

            piston["1-1"].style.left = `${-piston["2-2-1"].offsetWidth}px`;
            piston["1-2"].style.left = `${-piston["2-2-1"].offsetWidth}px`;
            piston["2-2-1"].style.left = `${piston["tmp1"].offsetHeight+piston["2-1"].offsetLeft}px`;
            piston["2-2-2"].style.left = `${piston["tmp1"].offsetHeight+piston["2-2-1"].offsetWidth+piston["2-1"].offsetLeft}px`;
            {
                let pi2: number = pobjIndex;
                for (let i = 0; i < allPhotoObjs.length; i++) {
                    allPhotoObjs[pi2].style.left=`${allPhotoObjs[pi2].offsetLeft+allPhotoObjs[pi2].offsetWidth}px`;

                    pi2--;
                    if (pi2<0)
                        pi2=allPhotoObjs.length-1;
                }
            }
            await sleep(pistonPushPhotoAnim_speed.speed);

            pobjIndex=indexAdd(pobjIndex,allPhotoObjs.length);
        }
        stop_pistonPushPhotoAnim=false;
        isStart_pistonPushPhotoAnim=false;
    }
}
export function pistonPushPhotoAnim_SpeedSet(num:number, isSet:boolean=false){
    if (isSet)
        pistonPushPhotoAnim_speed.speed=num;
    else
        pistonPushPhotoAnim_speed.speed+=num;
}
//#endregion

export function ruleText_Button_Click(){
    const obj=document.getElementById("ruleText_border")!;
    $("#ruleText_Button").fadeOut();
    obj.style.transition='unset';//临时关闭过渡效果，避免淡出效果不可见
    $("#ruleText_border").fadeIn();

    (async () => {
        await sleep(500);//等待一段时间后恢复过渡效果
        obj.style.transition='';
    })();
}