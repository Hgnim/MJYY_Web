<script setup lang="ts">
import McStatus from "@/components/mcStatus.vue";
import Broadcast from "@/components/broadcast.vue";
import LargeImageView from "@/components/largeImageView.vue";

import {autoUseI18n, getCurrentLocale, getFallbackLocale, localeEvents} from "@/utils/i18nUtils.ts";
import {useTitle} from "@vueuse/core";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import {imgLoaded,imgError} from "@/views/Home/ts/imgLoader.ts";
import {isDev} from "@/ts/env/packMode.ts";
import createToast from "@/ts/global/function/createToast.ts";

const {gt:t}=autoUseI18n();
const lp:string="view_Home";
autoLoadLocale(lp,()=>{
  useTitle(t(`${lp}.title`));
});

import {hashCheckAndScroll} from "@/router";
let loadProgress:number=0;
function loadDoneAdd(){
  loadProgress++;
  if (loadProgress>=2){//所有对象加载完毕后执行的逻辑
    hashCheckAndScroll();
  }
}

const homeSection:Ref<HTMLTableSectionElement|null> = ref(null);
const versionSection:Ref<HTMLTableSectionElement|null> = ref(null);

import onScroll from "@/views/Home/ts/onScroll.ts";
const {toggleNavbarBackground} = onScroll({
  titleRef: homeSection,
  titleUnderRef: versionSection,
});
onMounted(()=>{
  toggleNavbarBackground();

  loadDoneAdd();
});
onUnmounted(()=>{
})

/*import {sectionEvent} from "@/ts/global/navbar_sectionLinks/sectionEvent.ts";
function handleSectionStayChange(data:{secId:string}) {
  //用于临时测试，当停留位置更改至另一部分将触发该事件并执行输出
  console.debug(`[Home.vue][event] section: ${data.secId}`);
}
onMounted(()=>{
  sectionEvent.on('sectionStayChange',handleSectionStayChange);
});
onUnmounted(()=>{
  sectionEvent.off('sectionStayChange',handleSectionStayChange);
});*/

import { marked } from "marked";
const ruleText:Ref<HTMLDivElement|null> = ref(null);
async function doMd(){
  const tryLocale:string[]=[
    ...[getCurrentLocale()],//当前语言
    ...getFallbackLocale(true),//如果当前语言对应的文件未找到，则寻找回退语言
  ]
  for (let i=0;i<tryLocale.length;i++){
    try {
      ruleText.value!.innerHTML=
          (marked((await import(`./md/serverRule.${tryLocale[i]}.md?raw`)).default) as string);
      break;
    }catch {}
  }
}
onMounted(async ()=>{
  await doMd();
  localeEvents.on('afterLocaleChange',doMd);

  loadDoneAdd();
});
onUnmounted(async ()=>{
  localeEvents.off('afterLocaleChange',doMd);
})

import loadImage from "@/views/Home/ts/loadImage.ts";
import {imageQuality} from "@/components/navbar/ts/imageQuality.ts";
const {photoObjects,backImgSrc_get,imgSrc_get} = loadImage();

const largeImageView:Ref<InstanceType<typeof LargeImageView>|null> = ref(null);
function toLargeImageView(e:Event){
  if (largeImageView.value && e.target)
    largeImageView.value.largeImageView_show((e.target as HTMLImageElement).src);
}

import aos from "@/views/Home/plugin/aos.ts";
aos();

import {
  getMcServerAddress,
  getMcServerVersion,
  type McServerAddress,
  type McServerVersion
} from "@/ts/global/getMcServerInfo.ts";
const msVersion:Ref<McServerVersion|undefined|null>=ref(undefined);
const msAddress:Ref<McServerAddress|undefined|null>=ref(undefined);
(async ()=>{
  msVersion.value = await getMcServerVersion();
  msAddress.value= await getMcServerAddress();
})();

function startBtn_click(){
  versionSection.value?.scrollIntoView({
    behavior: 'smooth',//平滑
    block: 'start',//元素顶对其视口顶
  });
}

if (isDev){
  createToast({
    title:{
      content: '你好，开发者'
    },
    body:{
      content: '当前处为开发模式。'
    }
  });
}
</script>

<template>
  <section id="home" ref="homeSection">
    <div id="backimg"
         class="img-box"
         :key="imageQuality"
    ><!--由于loadstart经测试后不生效，所以将:key放置到父元素上，以解决重复加载不同质量的图片时图片加载动画不显示的问题-->
      <div class="loader-animation"></div>
      <img alt="background" draggable="false"
           class="unSelectable"
           @load="imgLoaded" @error="imgError"
           :src="backImgSrc_get()"
      >
    </div>
    <broadcast id="broadcast-container"/>
    <div class="d-flex align-items-center justify-content-center full-wh">
      <div>
        <div id="home_title">
          <span id="home_title_text1" class="unSelectable home_title_text"
                data-aos="zoom-in-down"
          >谧静幽原</span>
          <span id="home_title_text2" class="unSelectable home_title_text"
                data-aos="zoom-in-up"
          >相见有缘</span>
        </div>
        <div class="position-relative w-100 d-flex justify-content-center">
          <button data-aos="fade-in" id="start-btn" class="btn" @click="startBtn_click">{{t(`${lp}.startBtn`)}}</button>
        </div>
      </div>
    </div>
    <div id="mc-status" class="unSelectable"><!--data-aos="flip-left"-->
      <McStatus/>
    </div>
  </section>
  <section id="version" ref="versionSection" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 data-aos="fade-in">{{t(`${lp}.versionSection.title`)}}</h1>
        </div>
      </div>
      <div id="version_java-row" class="row version_row">
        <div id="version_java-row_text-div"
             class="col-12 col-md-7 order-1 order-md-2 version_text-div"
             data-aos="fade-left"
        >
          <h2>{{t(`${lp}.versionSection.javaEdition.h2`)}}</h2>
          <p>{{t(`${lp}.versionSection.javaEdition.p-0.0`)}}<strong>{{t(`${lp}.versionSection.javaEdition.p-0.1`)}}</strong>{{t(`${lp}.versionSection.javaEdition.p-0.2`)}}<strong>{{(msVersion)?msVersion.serverVersion:(msVersion===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</strong></p>
          <p>{{t(`${lp}.versionSection.javaEdition.p-1.0`)}}<strong>{{(msVersion)?msVersion.javaVersionMin:(msVersion===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</strong>{{t(`${lp}.versionSection.javaEdition.p-1.1`)}}<strong>{{(msVersion)?msVersion.javaVersionMax:(msVersion===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</strong>{{t(`${lp}.versionSection.javaEdition.p-1.2`)}}</p>
          <em>{{t(`${lp}.versionSection.javaEdition.em`)}}</em>
        </div>
        <div class="col-12 col-md-5 order-2 order-md-1">
          <div class="card card_img-box"
               data-aos="fade-right"
          >
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('versionSection/java_photo')">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="version_bedrock-row" class="row version_row">
        <div id="version_bedrock-row_text-div"
             class="col-12 col-md-7 version_text-div"
             data-aos="fade-right"
        >
          <h2>{{t(`${lp}.versionSection.bedrockEdition.h2`)}}</h2>
          <p>{{t(`${lp}.versionSection.javaEdition.p-1.0`)}}<strong>{{(msVersion)?msVersion.bedrockVersionMin:(msVersion===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</strong>{{t(`${lp}.versionSection.javaEdition.p-1.1`)}}<strong>{{(msVersion)?msVersion.bedrockVersionMax:(msVersion===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</strong>{{t(`${lp}.versionSection.javaEdition.p-1.2`)}}</p>
          <p>{{t(`${lp}.versionSection.bedrockEdition.p`)}}</p>
          <em>{{t(`${lp}.versionSection.bedrockEdition.em`)}}</em>
        </div>
        <div class="col-12 col-md-5">
          <div class="card card_img-box"
               data-aos="fade-left"
          >
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('versionSection/bedrock_photo')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="feature" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 data-aos="fade-in">{{t(`${lp}.featureSection.title`)}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p1')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-0.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-0.p`)}}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p2')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-1.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-1.p`)}}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p3')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-2.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-2.p`)}}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p6')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-3.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-3.p`)}}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p4')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-4.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-4.p`)}}</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 col-lg-4 mb-2">
          <div class="card card_img-box"
               data-aos="fade-up"
          >
            <div class="card-header card-header_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('featureSection/p7')">
              </div>
            </div>
            <div class="card-body">
              <h3>{{t(`${lp}.featureSection.card-5.h3`)}}</h3>
              <p>{{t(`${lp}.featureSection.card-5.p`)}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="photo" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 data-aos="fade-in">{{t(`${lp}.photoSection.title`)}}</h1>
        </div>
      </div>
      <div class="row" :key="imageQuality">
        <div v-for="(pObj,index) in photoObjects" 
             :key="index"
             class="col-12 col-sm-6 col-md-4 col-xl-3 mt-2">
          <div class="card card_img-box"
               data-aos="zoom-in-up"
          >
            <div class="card-body card-body_img-box">
              <div class="img-box">
                <div class="loader-animation"></div>
                <img alt="photo" loading="lazy"
                     class="can-click"
                     @click="toLargeImageView"
                     @load="imgLoaded" @error="imgError"
                     :src="pObj.photo[imageQuality]">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="rule" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 data-aos="fade-in">{{t(`${lp}.ruleSection.title`)}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-8 col-md-6 mx-auto">
          <div class="card"
               data-aos="zoom-out-up"
          >
            <div id="rule-text" ref="ruleText" class="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="join-us" class="pt-6">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h1 data-aos="fade-in">{{t(`${lp}.joinUsSection.title`)}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-10 col-md-8 mx-auto text-center"
             data-aos="fade-up"
        >
          <em>{{t(`${lp}.joinUsSection.text.em`)}}</em>
          <p>{{t(`${lp}.joinUsSection.text.p-0.0`)}}<code>{{(msAddress)?msAddress.addresses[0]?.je.addrs:(msAddress===undefined)?t('global.feedback.inText.loading'):t('global.feedback.inText.failed')}}</code></p>
        </div>
      </div>
      <div class="row">
        <div class="col-6 col-md-5 col-lg-3 offset-0 offset-md-1 offset-lg-3">
          <div class="card card_img-box joinUs-qrcode-card"
               data-aos="flip-down"
          >
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="qrcode" loading="lazy"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('qrcode/qqGroupQRcode')">
                <a href="https://qm.qq.com/q/siqAtkac9i" class="qrcode-link">
                  <span>{{t(`${lp}.joinUsSection.qgQrcodeHover`)}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 col-md-5 col-lg-3">
          <div class="card card_img-box joinUs-qrcode-card"
               data-aos="flip-down"
          >
            <div class="card-body card-body_img-box">
              <div class="img-box"
                   :key="imageQuality"
              >
                <div class="loader-animation"></div>
                <img alt="qrcode" loading="lazy"
                     @load="imgLoaded" @error="imgError"
                     :src="imgSrc_get('qrcode/qqDiscodeQRCode')">
                <a href="https://pd.qq.com/s/cci7lavxo" class="qrcode-link">
                  <span>{{t(`${lp}.joinUsSection.qdQrcodeHover`)}}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <LargeImageView ref="largeImageView"/>
</template>

<style scoped lang="scss" src="./scss/Home.scss"></style>
<style scoped lang="scss" src="./scss/utils.scss"></style>
<style scoped lang="scss" src="@/assets/scss/font/mzd-font.scss"></style>
<style scoped lang="scss" src="./scss/imgLoader.scss"></style>
<style scoped lang="scss" src="@/assets/scss/color/view/Home.scss"></style>

<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>
<style scoped lang="css" src="aos/dist/aos.css"></style>