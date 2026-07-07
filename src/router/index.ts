import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import {nextTick} from "vue";
import renderMode from "@/ts/env/renderMode.ts";
import {isClient} from "@/ts/env/ssr.ts";
import documentRouter from "@/router/document.router.ts";
import gamesRouter from "@/router/games.router.ts";

export function hashCheckAndScroll(){
    if (isClient) {
        //元素锚点跳转处理。示例url：/#/#home
        nextTick(() => {
            const hash: string[] = window.location.hash.split('#');
            if (hash.length > 1) {
                const sectionHash: string | undefined = (() => {
                    const popStr: string | undefined = hash.pop();
                    if (popStr != undefined) {
                        const urlParCheck = popStr.split('?');
                        if (urlParCheck.length != 1)
                            return `#${urlParCheck[0]}`
                        else
                            return `#${popStr}`;
                    } else
                        return undefined;
                })();
                if (sectionHash != undefined) {
                    const targetEl: HTMLElement | null = document.querySelector<HTMLElement>(sectionHash);
                    if (targetEl) {
                        targetEl.scrollIntoView({
                            behavior: 'smooth',//平滑
                            block: 'start',//元素顶对其视口顶
                        });
                    }
                }
            }
        }).then();
    }
}

const router = createRouter({
    history: (()=>{
        switch (renderMode){
            case 'ssg':
                return import.meta.env.SSR ? createMemoryHistory() : createWebHistory();
            case 'spa':
                return createWebHistory();
            case 'spa-hash':
                return createWebHashHistory();//hash模式，使用'#'内部导航，'#'及后面的内容不会发送给服务器，避免了非'/'时404的情况。
            default:
                throw new Error(`Unknown RENDER_MODE: ${renderMode}`);
        }
    })(),
    scrollBehavior(to, _from, savedPosition) {
        if (to.name=="home"){
            if (to.hash!=""){
                return ;
            }
        }
        if (savedPosition) return savedPosition;
        else return { top: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/Home.vue'),
            meta:{
                navbar_sectionLinks_Comp: () => import("@/views/Home/components/navbar_section-links.vue"),

                //将view的overflow-x设置为hidden
                app_view_useOverflowXHidden:true,
            }
        },
        {
            path: '/servermap',
            name: 'serverMap',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                route_reloadKey: "serverMap",

                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,

                authSubPage_targetUrlPath: '/gateway/post/minecraft_servermap',
                authSubPage_savePassword:{
                    cookie: {
                        path: '/servermap',
                        name: 'serverMap'
                    }
                },
                localePrefix: 'view_rpsp_serverMap',

                navbar_sectionLinks_Comp: () => import("@/components/pages/serverMap/component/navbar_tool-button.vue"),
                //执行serverMap页面所需的问题修复代码
                authSubPage_doServerMapFix: true,
            },
        },
        /*{
            path: '/analyticspanel',
            name: 'analyticsPanel',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                route_reloadKey: "analyticsPanel",

                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,

                authSubPage_targetUrlPath: '/gateway/post/minecraft_plan',
                authSubPage_savePassword:{
                    cookie: {
                        path: '/analyticspanel',
                        name: 'analyticsPanel'
                    }
                },
                localePrefix: 'view_rpsp_analyticsPanel',
            },
        },*/
        {
            path: '/messageboard',
            name: 'messageBoard',
            component: () => import('@/views/ReuseParentSubPage.vue'),
            meta:{
                //使用不同的key，让router-view重新加载复用页面
                route_reloadKey: "messageBoard",

                //为view添加顶部内边距，防止导航栏遮挡
                app_view_usePaddingTop: true,
                //将view大小固定为全屏
                app_view_useFullScreen: true,

                //目标请求地址
                authSubPage_targetUrlPath: '/gateway/post/minecraft_messagepage',
                //保存密码功能参数
                authSubPage_savePassword:{
                    cookie: {
                        path: '/messageboard',
                        name: 'messageBoard'
                    }
                },
                //语言文件前缀
                localePrefix: 'view_rpsp_messageBoard',
            }
        },
        {
            path: '/donate',
            name: 'donate',
            component: ()=>import('@/views/Donate/Donate.vue'),
            meta:{
                app_view_usePaddingTop: true,
            },
        },
        {
            path: '/donate/hatemjyy',
            name: 'donate_hateMjyy',
            component: ()=>import('@/views/Donate/pages/hateMjyy.vue'),
            meta:{
                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,
            },
        },
        ...documentRouter,
        ...gamesRouter,

        {
            path: '/404',//使预渲染工具构建一个404.html以供github page使用
            name: '404',
            component: ()=>import('@/views/404.vue'),
            meta:{
                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: ()=>import('@/views/404.vue'),
            meta:{
                app_view_usePaddingTop: true,
                app_view_useFullScreen: true,
            },
        },
    ],
});
router.afterEach((_to,_from)/*(to,from)*/ => {
    hashCheckAndScroll();
});

export default router;