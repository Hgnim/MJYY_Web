<script setup lang="ts">
import {type JavaStatusResponse, statusJava} from "node-mcstatus";
import {onMounted, onUnmounted, ref, type Ref} from "vue";
import {autoUseI18n, localeEvents} from "@/utils/i18nUtils.ts";
import {isProd} from "@/ts/env/packMode.ts";

const {lt:t}=autoUseI18n();

const icon:Ref<HTMLImageElement|null> = ref(null);
const motd:Ref<HTMLDivElement|null> = ref(null);
const version:Ref<HTMLDivElement|null> = ref(null);
const playerOnline:Ref<HTMLSpanElement|null> = ref(null);
const playerList:Ref<HTMLDivElement|null> = ref(null);

let isChecking:boolean = false;
async function startCheck(){
  if(isProd) {
    if (
        !isChecking
        &&motd.value
        && version.value
        && playerOnline.value
        && playerList.value
        && icon.value
    ) {
      isChecking=true;
      try {
        motd.value.innerText=t('loading');
        version.value.innerText=t('loading');
        playerOnline.value.innerText=t('mcStatus-playerOnline.main',{online: '-',max: '-'});
        playerList.value.innerHTML=`<strong>${t('mcStatus-playerOnline.list.title')}</strong>`;

        const jsr: JavaStatusResponse = await statusJava("sp.mjyy.top",30303);
        if (jsr.online) {
          if (jsr.motd)
            motd.value.innerHTML = jsr.motd.html.replace(/<span>[^>]*\n[^<]*<\/span>/, "<br>");
          else
            motd.value.innerText = t('error');
          if (jsr.version)
            version.value.innerHTML = jsr.version.name_html;
          else
            version.value.innerText = t('error');
          if (jsr.players) {
            playerOnline.value.innerText =
                t('mcStatus-playerOnline.main', {
                  online: jsr.players.online,
                  max: jsr.players.max
                });
            jsr.players.list.forEach(pl => {
              playerList.value!.innerHTML += '<br>' + pl.name_html;
            })
          }
          if (jsr.icon)
            icon.value.src = jsr.icon;
        } else {
          motd.value.innerText = t('offline');
          version.value.innerText = t('offline');
        }
      } catch {
        motd.value.innerText = t('error');
        version.value.innerText = t('error');
      }finally {
        isChecking=false;
      }
    }
  }else{
    motd.value!.innerText = t('dev');
    version.value!.innerText = t('dev');
  }
}

onMounted(async ()=>{
  await startCheck();
  localeEvents.on('afterLocaleChange',startCheck);
});
onUnmounted(()=>{
  localeEvents.off('afterLocaleChange',startCheck);
});


function restartCheck_click(){
  startCheck();
}
</script>

<template>
<div id="mcStatus-root">
  <div id="mcStatus-icon_box">
    <img id="mcStatus-icon" ref="icon"
         src="@/assets/svg/logo/mjyy-logo.svg" alt="server icon"
         @click="restartCheck_click"
    />
  </div>
  <div id="mcStatus-motd" ref="motd">{{t('loading')}}</div>
  <div id="mcStatus-version" ref="version">{{t('loading')}}</div>
  <div id="mcStatus-player">
    <span ref="playerOnline">{{t('mcStatus-playerOnline.main',{online: '-',max: '-'})}}</span>
    <div id="mcStatus-player-list" ref="playerList">
      <strong>{{t('mcStatus-playerOnline.list.title')}}</strong>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
//region mcStatus-root_scrollbar
//Chrome浏览器的滚动条样式
@mixin mcStatus-root_-webkit-scrollbar{
  width: 8px;//垂直滚动条宽度
  height: 100%;//水平滚动条高度
}
//滚动条滑块
@mixin mcStatus-root_-webkit-scrollbar-thumb{
  background: transparent;
  border-radius: 5px;
  transition: background 0.3s;
}
//滑块悬停
@mixin mcStatus-root_-webkit-scrollbar-thumb_hover{
  background: transparent;
}
//滚动条滑道
@mixin mcStatus-root_-webkit-scrollbar-track{
  background: transparent;
  border-radius: 5px;
}
//滚动条上下箭头按钮
@mixin mcStatus-root_-webkit-scrollbar-button{
  display: none;//隐藏按钮
}
@mixin mcStatus-root_firefox-scrollbar{
  @-moz-document url-prefix() {//firefox样式隔离，大括号内的样式供firefox浏览器使用
    scrollbar-width: auto;
    scrollbar-color: transparent transparent; //滑块颜色；滑道颜色
  }
}

#mcStatus-root::-webkit-scrollbar {
  @include mcStatus-root_-webkit-scrollbar;
}
#mcStatus-root::-webkit-scrollbar-thumb {
  @include mcStatus-root_-webkit-scrollbar-thumb;
}
#mcStatus-root::-webkit-scrollbar-thumb:hover {
  @include mcStatus-root_-webkit-scrollbar-thumb_hover;
}
#mcStatus-root::-webkit-scrollbar-track {
  @include mcStatus-root_-webkit-scrollbar-track;
}
#mcStatus-root::-webkit-scrollbar-button {
  @include mcStatus-root_-webkit-scrollbar-button;
}
//endregion
#mcStatus-root{
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: repeat(3, auto);//repeat(3, 1fr);
  grid-column-gap: .3rem;
  grid-row-gap: 0;
  grid-template-areas:
    "g0 g1"
    "g0 g2"
    "g0 g3";
  max-height: 6rem;
  overflow-y: scroll;
  @include mcStatus-root_firefox-scrollbar;
}
#mcStatus-icon_box {
  grid-area: g0;
  display: flex;
  align-items: center;
  #mcStatus-icon {
    height: 64px;
    image-rendering: pixelated;
  }
}
#mcStatus-motd{
  grid-area: g2;
}
#mcStatus-version{
  grid-area: g1;
}
#mcStatus-player{
  grid-area: g3;
  #mcStatus-player-list{
    display: none;
    position: absolute;
    background-color: var(--mcstatus-player-list-bg);
    padding: .5rem;
    border-radius: 10px;
    bottom: 2rem;
    max-height: 20rem;
    overflow-y: scroll;
    @include mcStatus-root_firefox-scrollbar;
  }
  //region mcStatus-player-list scrollbar
  #mcStatus-player-list::-webkit-scrollbar {
    @include mcStatus-root_-webkit-scrollbar;
  }
  #mcStatus-player-list::-webkit-scrollbar-thumb {
    @include mcStatus-root_-webkit-scrollbar-thumb;
  }
  #mcStatus-player-list::-webkit-scrollbar-thumb:hover {
    @include mcStatus-root_-webkit-scrollbar-thumb_hover;
  }
  #mcStatus-player-list::-webkit-scrollbar-track {
    @include mcStatus-root_-webkit-scrollbar-track;
  }
  #mcStatus-player-list::-webkit-scrollbar-button {
    @include mcStatus-root_-webkit-scrollbar-button;
  }
  //endregion
}
#mcStatus-player:hover #mcStatus-player-list{
  display: inherit;
}
</style>
<style scoped lang="scss" src="@/assets/scss/color/component/mcStatus.scss"></style>

<i18n>
{
  "zh-CN": {
    "mcStatus-playerOnline": {
      "main": "在线人数：{online}/{max}",
      "list": {
        "title": "玩家列表："
      }
    },
    "loading": "检测中……",
    "error": "检测失败",
    "offline": "服务离线",
    "dev": "开发模式不进行检测"
  },
  "en-US": {
    "mcStatus-playerOnline": {
      "main": "online: {online}/{max}",
      "list": {
        "title": "Player List："
      }
    },
    "loading": "checking...",
    "error": "failed",
    "offline": "server offline",
    "dev": "dev mode"
  }
}
</i18n>