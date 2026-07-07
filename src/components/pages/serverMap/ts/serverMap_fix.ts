/*
修复服务器地图在被鼠标拖动或触控滑动时坐标值清空和地图变黑的问题。
在子网页完全加载后，更变容器样式中的宽度或高度属性即可解决上述问题。
目前采用方案的是将容器高度更改后等待响应后立刻更改回去。
目前还未找到最完美的修复方案。
*/

import {sleep} from "@/utils/sleep.ts";
import {isClient} from "@vueuse/core";

export default async function (){
    if (isClient) {
        const target: HTMLIFrameElement | null = document.getElementById('mainIframe') as HTMLIFrameElement | null;
        if (target) {
            target.style.height = '0';
            await sleep(1);
            target.style.height = '';
        }
    }
}