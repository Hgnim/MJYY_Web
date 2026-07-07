<script setup lang="ts">
import {autoUseI18n, getCurrentLocale, switchLocale} from "@/utils/i18nUtils.ts";
import {
  type AsyncComponentLoader,
  type Component,
  computed,
  defineAsyncComponent, onMounted,
  ref,
  type Ref,
  watch,
} from "vue";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";
import {useRoute} from "vue-router";
import {curSelTheme, doThemeSel, themeIcon, init as themeInit} from "@/components/navbar/ts/theme.ts";
import {doImgQualSel, imageQuality, init as imgQuaInit} from "@/components/navbar/ts/imageQuality.ts";
import {sleep} from "@/utils/sleep.ts";
import donateShowOrHidden from "@/views/Donate/ts/donateShowOrHidden.ts";

const {gt:t}=autoUseI18n();
const lp:string="comp_navbar";
const {isReady:localeIsReady} = autoLoadLocale(lp);

const route = useRoute();
const meta = computed(() => ({
  navbar:{
    sectionLinksComp: route.meta.navbar_sectionLinks_Comp as AsyncComponentLoader<any>,
  },
}));

const emit = defineEmits<{
  (e: 'normal_offsetHeight_init',normal_offsetHeight:number):void;
}>();

const curLoc:Ref<string>= ref(getCurrentLocale());
async function doLangSel(lang:string){
  await switchLocale(lang);
  curLoc.value=getCurrentLocale();
}

themeInit();

import {navbarClassInit, navbarStyleInit, toggleClass} from './ts/style.ts';
const navbar:Ref<HTMLDivElement|null> = ref(null);
navbarStyleInit(navbar);
navbarClassInit(navbar);

//region section links
//页面元素锚点面板组件
let sectionLinksComp:Component|null=null;
//变化键，用于检测组件变化并重新渲染
const sectionLinksComp_key:Ref<string>=ref('');
watch(
    ()=>meta.value.navbar.sectionLinksComp,//监听值变化
    ()=>{
      if (meta.value.navbar.sectionLinksComp)
        sectionLinksComp=defineAsyncComponent(meta.value.navbar.sectionLinksComp);
      else
        sectionLinksComp=null;
      sectionLinksComp_key.value=btoa(JSON.stringify(sectionLinksComp));//赋值唯一标识，通过获取其Base64编码字符串
    },
    { immediate: true }
);
//endregion
const curRouteName:Ref<string|undefined>=ref(undefined);
watch(
    ()=>route.name,
    ()=>{routeName_onChange();}
)
function routeName_onChange(){
  curRouteName.value=route.name as string|undefined;

  //切换页面的时候恢复导航栏背景
  toggleClass('transition-background-color', false);
  toggleClass('background-color-transparent', false);
}

onMounted(()=>{
  routeName_onChange();
});
onMounted(async ()=>{
  while (true){
    if (localeIsReady.value){
      normal_offsetHeight=navbar.value!.offsetHeight;
      emit('normal_offsetHeight_init',normal_offsetHeight);
      document.documentElement.style.setProperty('--navbar-normal_offsetHeight',normal_offsetHeight.toString()+'px');

      break;
    }
    await sleep(500);
  }
});

//导航栏正常大小下的高度。只被赋值一次，避免导航栏后续进行展开等导致高度被改变。
let normal_offsetHeight:number|undefined;
defineExpose({
  normal_offsetHeight_get():number|undefined{return normal_offsetHeight;},
  offsetHeight_get():number|undefined{return navbar.value?.offsetHeight;},
});

const navbarCollapseContent: Ref<HTMLDivElement | null> = ref(null);
import navbarCollapse from "@/components/navbar/ts/navbarCollapse.ts";
const { bindNavLinks,doHideCollapser, } = navbarCollapse(navbarCollapseContent);
function sectionLinksComp_onMounted() {
  bindNavLinks();//组件挂载后对其内的链接进行绑定
}

imgQuaInit(lp);
</script>

<template>
  <nav
      ref="navbar"
      class="navbar navbar-expand-lg"
  >
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home'}" draggable="false">
        <svg class="navbar-logo unSelectable"
             width="40" height="40"
        ><use xlink:href="#svg-logo-mjyy-logo"></use></svg>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapseContent" aria-controls="navbarCollapseContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" ref="navbarCollapseContent" id="navbarCollapseContent">
        <ul class="navbar-nav flex-row flex-wrap me-auto mb-2 mb-lg-0">
          <li class="nav-item nav-btn col-6 col-lg-auto">
            <router-link class="nav-link text-center unSelectable" :class="{'active':(curRouteName=='home')}" aria-current="page" :to="{ name: 'home'}">
              <strong>{{t(`${lp}.home`)}}</strong>
            </router-link>
          </li>
          <li class="nav-item nav-btn col-6 col-lg-auto">
            <router-link class="nav-link text-center unSelectable" aria-current="page"
                         :class="{'active':(curRouteName=='document'||curRouteName?.startsWith('docs_'))}"
                         :to="{ name: 'document'}"
            ><strong>{{t(`${lp}.document`)}}</strong></router-link>
          </li>
          <li class="nav-item dropdown col-12 col-lg-auto hover-dropdown nav-btn">
            <a class="nav-link hover-dropdown-btn text-center unSelectable" aria-current="page" role="button">{{t(`${lp}.more`)}}</a>
            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <router-link class="nav-link text-center unSelectable" aria-current="page"
                             :class="{'active':(curRouteName=='serverMap')}"
                             :to="{ name: 'serverMap'}"
                >{{t(`${lp}.serverMap`)}}</router-link>
              </li>
              <!--<li class="dropdown-item">
                <router-link class="nav-link text-center unSelectable" aria-current="page"
                             :class="{'active':(curRouteName=='analyticsPanel')}"
                             :to="{name: 'analyticsPanel'}">{{t(`${lp}.analyticsPanel`)}}</router-link>
              </li>-->
              <li class="dropdown-item">
                <router-link class="nav-link text-center unSelectable" aria-current="page"
                             :class="{'active':(curRouteName=='messageBoard')}"
                             :to="{name: 'messageBoard'}">{{t(`${lp}.messageBoard`)}}</router-link>
              </li>
              <li class="dropdown-item">
                <router-link class="nav-link text-center unSelectable" aria-current="page"
                             :class="{'active':(curRouteName=='game')}"
                             :to="{name: 'game'}">{{t(`${lp}.game`)}}</router-link>
              </li>
              <li class="dropdown-item">
                <a class="nav-link text-center unSelectable" aria-current="page" href="https://old.mjyy.top/">
                  <strong>{{t(`${lp}.old`)}}</strong>
                  <svg class="bi" width="12" height="12" ><use xlink:href="#svg-bsi-box-arrow-up-right"></use></svg>
                </a>
              </li>
            </ul>
          </li>
          <li class="nav-item nav-btn col-6 col-lg-auto" v-if="donateShowOrHidden()">
            <router-link id="donate-link"
                         class="nav-link text-center unSelectable"
                         :class="{'active':(curRouteName=='donate')}"
                         aria-current="page"
                         :to="{ name: 'donate'}"
            >
              <strong>{{t(`${lp}.donate`)}}</strong>
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav flex-row flex-wrap nav-2">
          <li v-show="sectionLinksComp!=null" class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <component
              :is="sectionLinksComp"
              :key="sectionLinksComp_key"
              @onMounted="sectionLinksComp_onMounted"
          />
        </ul>
        <ul class="navbar-nav flex-row flex-wrap d-flex justify-content-evenly nav-2">
          <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
            <div class="vr d-none d-lg-flex h-100 mx-lg-2 text-white"></div>
            <hr class="d-lg-none my-2 text-white-50">
          </li>
          <li class="nav-item dropdown unSelectable">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi" width="24" height="24" ><use :xlink:href="themeIcon"></use></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t(`${lp}.theme.theme-sel`)}}</h6>
              </li>
              <li>
                <button @click="doThemeSel('auto')" :class="{ 'active': (curSelTheme=='auto') }" class="dropdown-item">
                  <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-clock"></use></svg>
                  {{t(`${lp}.theme.auto`)}}
                  <svg :style="(curSelTheme!='auto')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doThemeSel('system')" :class="{ 'active': (curSelTheme=='system') }" class="dropdown-item">
                  <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-circle-half"></use></svg>
                  {{t(`${lp}.theme.system`)}}
                  <svg :style="(curSelTheme!='system')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doThemeSel('light')" :class="{ 'active': (curSelTheme=='light') }" class="dropdown-item">
                  <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-sun"></use></svg>
                  {{t(`${lp}.theme.light`)}}
                  <svg :style="(curSelTheme!='light')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doThemeSel('dark')" :class="{ 'active': (curSelTheme=='dark') }" class="dropdown-item">
                  <svg class="bi" width="16" height="16" ><use xlink:href="#svg-bsi-moon-stars"></use></svg>
                  {{t(`${lp}.theme.dark`)}}
                  <svg :style="(curSelTheme!='dark')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown unSelectable">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-translate"></use></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t(`${lp}.langs.lang-sel`)}}</h6>
              </li>
              <li>
                <button @click="doLangSel('zh-CN')" :class="{ 'active': (curLoc=='zh-CN') }" class="dropdown-item">
                  {{t(`${lp}.langs.zh-CN`)}}
                  <svg :style="(curLoc!='zh-CN')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doLangSel('en-US')" :class="{ 'active': (curLoc=='en-US') }" class="dropdown-item">
                  {{t(`${lp}.langs.en-US`)}}
                  <svg :style="(curLoc!='en-US')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown unSelectable">
            <button type="button" class="btn btn-link nav-link dropdown-toggle" data-bs-toggle="dropdown">
              <svg class="bi" width="24" height="24" ><use xlink:href="#svg-bsi-images"></use></svg>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <h6 class="dropdown-header">{{t(`${lp}.imageQuality.selTitle`)}}</h6>
              </li>
              <li>
                <button @click="doImgQualSel('source')" :class="{ 'active': (imageQuality=='source') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.source`)}}
                  <svg :style="(imageQuality!='source')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doImgQualSel('high')" :class="{ 'active': (imageQuality=='high') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.high`)}}
                  <svg :style="(imageQuality!='high')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doImgQualSel('normal')" :class="{ 'active': (imageQuality=='normal') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.normal`)}}
                  <svg :style="(imageQuality!='normal')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doImgQualSel('mid')" :class="{ 'active': (imageQuality=='mid') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.mid`)}}
                  <svg :style="(imageQuality!='mid')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doImgQualSel('low')" :class="{ 'active': (imageQuality=='low') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.low`)}}
                  <svg :style="(imageQuality!='low')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
              <li>
                <button @click="doImgQualSel('potato')" :class="{ 'active': (imageQuality=='potato') }" class="dropdown-item">
                  {{t(`${lp}.imageQuality.potato`)}}
                  <svg :style="(imageQuality!='potato')?{display: 'none'}:{}" class="bi" width="16" height="16"><use xlink:href="#svg-bsi-check2"></use></svg>
                </button>
              </li>
            </ul>
          </li>
        </ul>
        <div id="navbar-backscreen" @click="doHideCollapser()"></div>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss" src="./scss/navbar.scss"></style>
<style scoped lang="scss" src="./scss/navbar-change.scss"></style>
<style scoped lang="scss" src="@/assets/scss/color/component/navbar.scss"></style>

<style scoped lang="css" src="@/assets/css/global/unSelect.css"></style>