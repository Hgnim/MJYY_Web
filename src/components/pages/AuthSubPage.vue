<script setup lang="ts">
import backendPost from '@/ts/backend/post.ts';
import {type Component, defineAsyncComponent, type PropType, ref, type Ref} from "vue";
import PasswordInput, {type SavePasswordProp} from "@/components/passwordInput.vue";
import {useCookies} from "@vueuse/integrations/useCookies";
import urlAddParam from "@/utils/urlAddParam.ts";
//import {autoUseI18n} from "@/utils/i18nUtils.ts";
import autoLoadLocale from "@/ts/global/vue/autoLoadLocale.ts";

//const {gt:t}=autoUseI18n();
const lp:string="comp_page_AuthSubPage";
autoLoadLocale(lp);

const props = defineProps({
  targetUrlPath: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    default: '',
  },
  other:{
    type: Object,
    default: {},
  },
  savePassword: {
    type: Object as PropType<SavePasswordProp>,
    default: null,
  },
});

const mainIframe:Ref<HTMLIFrameElement|null> = ref(null);
let mainIframe_haveSrc:boolean = false;
const authContainer:Ref<HTMLDivElement|null> = ref(null);
const passwordInput:Ref<InstanceType<typeof PasswordInput>|null>=ref(null);
let addonComp:Component|null=null;
const addonComp_key:Ref<string>=ref('');

/**
 * 获取目标时间与当前时间的差
 * @param future 目标时间
 * @return 单位：秒
 */
function toFutureTime(future:Date|string):number{
  const futTime:Date=(()=>{
    if (future instanceof Date)
      return future;
    else
      return new Date(future);
  })();
  return (futTime.getTime()-Date.now())/1000;
}

async function onPasswdEnter(password:string){
  if (passwordInput.value) {
    passwordInput.value.showFeedback('alert-secondary', 4);
    passwordInput.value.lockInput();

    {
      const unlockTime=useCookies().get('passwordAuthLockDown_unlockTime');
      if (unlockTime!=undefined){
        passwordInput.value.showFeedback(
            'alert-danger',
            6,
            {timeSec:Math.round(toFutureTime(unlockTime))}
        );
        passwordInput.value.unlockInput();
        return;
      }
    }

    const res = await backendPost(props.targetUrlPath, {Password: password});
    if (res.result != undefined) {
      if (res.result.ok) {
        passwordInput.value.showFeedback('alert-success', 3);
        mainIframe_haveSrc = true;
        mainIframe.value!.src = urlAddParam(res.result.json.url,{
              params:[
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
      }else{
        if(res.result.statusCode==401) {
          switch (res.result.json.errorId){
            case 0:
              passwordInput.value.showFeedback('alert-danger', 1);
              passwordInput.value.unlockInput();
              break;
            case 1:
            case 2:
              const unlockTime=res.result.json.unlockTime;
              const waitTime=Math.round(toFutureTime(unlockTime));
              switch (res.result.json.errorId){
                case 1:
                  passwordInput.value.showFeedback(
                      'alert-danger',
                      5,
                      {timeSec:waitTime}
                  );
                  break;
                case 2:
                  passwordInput.value.showFeedback(
                      'alert-danger',
                      7,
                      {timeSec:waitTime}
                  );
                  break;
              }
              passwordInput.value.unlockInput();
              useCookies().set('passwordAuthLockDown_unlockTime',unlockTime,{
                expires: new Date(unlockTime)
              });
              break;
          }
        }
        else {
          passwordInput.value.showFeedback('alert-warning', 2);
          passwordInput.value.unlockInput();
        }
      }
    }
    else {
      passwordInput.value.showFeedback('alert-warning', 2);
      passwordInput.value.unlockInput();
    }
  }
}

function mainIframe_onLoad(){
  if (mainIframe.value && authContainer.value) {
    if(mainIframe_haveSrc){
      mainIframe.value.style.display = '';
      //passwordInput.value?.hidePanel();
      authContainer.value.style.display = 'none';

      if (props.other.doServerMapFix==true){
        addonComp=defineAsyncComponent(()=>import('@/components/pages/serverMap/component/AuthSubPage_waitLoading.vue'));
        addonComp_key.value=btoa(JSON.stringify(addonComp));

        (async ()=>{
          const {sleep}=await import('@/utils/sleep');
          const smFix = (await import('@/components/pages/serverMap/ts/serverMap_fix.ts')).default;

          await sleep(2600);//容错时间，等待子页完全加载
          await smFix();//使用document对其进行修复操作，避免修复操作被vue优化掉
        })();
      }
    }
  }
}

//region toast
import {hostname as webHostname,protocol as webProtocol} from "@/ts/env/web.ts";
import createToast from "@/ts/global/function/createToast.ts";
import {isClient} from "@/ts/env/ssr.ts";
if (isClient){
  const winLoc: Location = window.location;
  if (
        winLoc.hostname!=webHostname
      && webHostname
      && webProtocol
  ){
    createToast({
      title:{
        content:'global.toast.title.warning',
        i18n:{
          isI18nKey:true,
        }
      },
      body:{
        content:`${lp}.toast.hostnameIsNotMain`,
        i18n:{
          isI18nKey:true,
          i18nArgs:{targetUrl:winLoc.href.replace(winLoc.origin,`${webProtocol}//${webHostname}`)},
        }
      }
    })
  }
}
//endregion
</script>

<template>
  <div id="main">
    <iframe ref="mainIframe" id="mainIframe"
            src=''
            :onload="mainIframe_onLoad"
            style="display:none;"
            allow="fullscreen; pointer-lock;"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
    ></iframe>
  </div>
  <div id="authContainer" ref="authContainer">
    <div id="authBox">
      <h2 id="mainTitle">{{props.title}}</h2>
      <PasswordInput ref="passwordInput"
                     @passwdEnter="onPasswdEnter"
                     :savePassword="props.savePassword"
      />
    </div>
  </div>
  <component :is="addonComp"
             :key="addonComp_key"
  />
</template>

<style scoped lang="scss">
#main{
  position: relative;
  width:100%;
  height:100%;
  top:0;
  left:0;
}
#mainIframe{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  border:none;
}
#authContainer{
  position: absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  #authBox{
    #mainTitle{
      text-align: center;
    }
  }
}
</style>