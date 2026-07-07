import {scrollValue} from "@/ts/global/vue/scroll.ts";
import {toggleClass as navbar_toggleClass} from "@/components/navbar/ts/style.ts";
import {onMounted, onUnmounted, type Ref} from "vue";
import {isClient} from "@/ts/env/ssr.ts";
import { useScrollLock } from '@vueuse/core'

export type TitleSplitFuncOpt= {
    titleRef: Ref<HTMLTableSectionElement | null>,
    titleUnderRef: Ref<HTMLTableSectionElement | null>,
};
export default function (
    titleSplitFuncOpt: TitleSplitFuncOpt,
){

    const {scrollY,callback:scrollValue_callback}=scrollValue();

    let navbarBgIsTran:boolean|null=null;
    let tbcCloseTimeoutLock:boolean=false;
    /**
     * 根据滚动位置改变导航栏背景
     */
    function toggleNavbarBackground():void{
        if (scrollY.value>200) {//在顶部时导航栏全透明，往下滚动后导航栏变为半透明
            if (navbarBgIsTran!=false){
                navbar_toggleClass('background-color-transparent', false);
                if (!tbcCloseTimeoutLock) {
                    tbcCloseTimeoutLock = true;
                    setTimeout(() => {
                        navbar_toggleClass('transition-background-color', false);
                        tbcCloseTimeoutLock = false;
                    }, 1000);
                }
                navbarBgIsTran=false;
            }
        }
        else {
            if (navbarBgIsTran!=true){
                navbar_toggleClass('transition-background-color', true);
                navbar_toggleClass('background-color-transparent', true);
                navbarBgIsTran=true;
            }
        }
    }

    let titleSplitFuncStatusCode:number=(()=>{
        if (isClient){
            if(
                   window.location.hash!='#home'
                && window.location.hash!=''
            )
                return 1;
            else
                return 0;
        }else return 0;
    })();
    const bodyScrollLocker= isClient?useScrollLock(document.body):null;
    /**
     * 主页的首页部分单独分离
     */
    function titleSplit(){
        if (   titleSplitFuncOpt.titleRef.value
            && titleSplitFuncOpt.titleUnderRef.value
        ){
            switch (titleSplitFuncStatusCode){
                case 0:
                    if (scrollY.value>0){
                        if (bodyScrollLocker!=null)
                            bodyScrollLocker.value=true;

                        titleSplitFuncOpt.titleUnderRef.value.scrollIntoView({
                            behavior: 'smooth',//平滑
                            block: 'start',//元素顶对其视口顶

                        });

                        titleSplitFuncStatusCode=1;
                    }
                    break;
                case 1:
                    if (scrollY.value>=titleSplitFuncOpt.titleUnderRef.value.offsetTop/*titleSplitFuncOpt.titleRef.value.offsetHeight*/){
                        if (bodyScrollLocker!=null)
                            bodyScrollLocker.value=false;

                        titleSplitFuncStatusCode=2;
                    }
                    break;
                case 2:
                    if (scrollY.value<titleSplitFuncOpt.titleRef.value.offsetHeight){
                        if (bodyScrollLocker!=null)
                            bodyScrollLocker.value=true;

                        titleSplitFuncOpt.titleRef.value.scrollIntoView({
                            behavior: 'smooth',//平滑
                            block: 'start',//元素顶对其视口顶
                        });

                        titleSplitFuncStatusCode=3;
                    }
                    break;
                case 3:
                    if (scrollY.value<=0){
                        if (bodyScrollLocker!=null)
                            bodyScrollLocker.value=false;

                        titleSplitFuncStatusCode=0;
                    }
                    break;
            }
        }
    }
    function scrollHandle(){
        toggleNavbarBackground();
        titleSplit();
    }

    onMounted(()=>{
        scrollValue_callback.onScroll=scrollHandle;
    });
    onUnmounted(()=>{
        scrollValue_callback.onScroll=null;
    })

    return {toggleNavbarBackground};
}