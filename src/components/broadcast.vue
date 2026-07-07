<script setup lang="ts">
import backendGet from "@/ts/backend/get.ts";
import {onMounted, ref, type Ref} from "vue";
import { render as mcRender } from "minecraft-text";
import urlAddParam from "@/utils/urlAddParam.ts";
import {isProd} from "@/ts/env/packMode.ts";

const broadcast: Ref<HTMLDivElement | null> = ref(null);
const broadcastContent: Ref<HTMLSpanElement | null> = ref(null);
const broadcastContent_is_doScroll:Ref<boolean> = ref(false);
const broadcastContentContainer:Ref<HTMLDivElement | null> = ref(null);
onMounted(async () => {
  if (isProd) {
    const targetUrl: string | null | undefined = await (async () => {
      const res = await backendGet('/gateway/get/minecraft_broadcast');
      if (res.result != undefined) {
        if (res.result.ok)
          return urlAddParam(res.result.json.url, {
            params: [
              {
                name: 'passkey',
                value: res.result.json.paras.passkey,
              },
              {
                name: 'source',
                value: res.result.json.paras.source,
              }
            ]
          });
        else
          return null;
      }
    })();
    if (targetUrl) {
      const res = await fetch(targetUrl, {
        method: 'GET',
      });
      if (res.ok) {
        broadcastContent.value!.innerHTML = mcRender(await res.text(), "§");
        {//为动态插入的html附上父元素的data-v-，以确保其能使用局部css
          const scopeId = broadcastContent.value!.getAttributeNames().find(name => name.startsWith('data-v-'));
          broadcastContent.value!.querySelectorAll('*').forEach(el => el.setAttribute(scopeId!, ''));
        }
        broadcast.value!.style.display = '';
      }
    }
  }else{
    broadcastContent.value!.innerText = (()=>{
      let res='开发模式，测试：';
      for (let i=0;i<50;i++){
        res+=i.toString();
      }
      return res;
    })();
    broadcast.value!.style.display = '';
  }
  if (broadcastContent.value!.offsetWidth > broadcastContentContainer.value!.offsetWidth) {
    broadcastContent.value!.style.setProperty
      ('--scroll_animation-duration_value', `${broadcastContent.value!.offsetWidth/30}s`);
    broadcastContent_is_doScroll.value=true;
  }
});
</script>

<template>
  <div>
    <div ref="broadcast" id="broadcast" style="display:none;">
      <svg class="bi"><use xlink:href="#svg-bsi-megaphone-fill"></use></svg>
      <div ref="broadcastContentContainer" id="broadcast-content_container">
        <span ref="broadcastContent"
              id="broadcast-content"
              :class="{ 'doScroll': broadcastContent_is_doScroll}"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
#broadcast{
  display: flex;
  justify-content: center;
  align-items: center;
  svg{
    height: 16px;
    width: 16px;
  }
  #broadcast-content{
    line-height: 1rem;
    font-size: 1rem;
    position: absolute;
    text-wrap: nowrap;
    --scroll_animation-duration_value: ;
    &.doScroll{
      animation: broadcast-content_scroll linear var(--scroll_animation-duration_value) infinite;
    }
  }
  @keyframes broadcast-content_scroll{
    0%{
      transform: translateX(0);
    }
    50%{
      transform: translateX(-100%) translateX(50vw);
    }
    100%{
      transform: translateX(0);
    }
  }
  #broadcast-content_container{
    width: 50vw;
    height: 1.2rem;//为了适应mc字体，因此将值从1rem调整至1.2rem
    overflow:hidden;
    position: relative;

    mask-image: linear-gradient(to right, black 60%, transparent 101%);//渐透明效果
    mask-repeat: no-repeat;
  }
}
</style>
<style scoped lang="css" src="~/minecraft-text/style.css"></style>