import {pingServer_Start} from "@/ts/index/pingServer";
import {imageClick,bvfiClick} from "@/ts/index/bigViewForImage";
import {loadMediaResources,userSelectResourceMode,SetResourceMode,GetResourceMode} from "@/ts/index/loadResources";
import {bgSwap_Change, LoadingOver} from '@/ts/index/loading';
import {
  SetScrollEffect,
  GetScrollEffectFromCookieAndSet,
  pistonPushPhotoAnim_SpeedSet
} from "@/ts/index/pageScrollEffect";
import {isMobile} from "@/ts/global/deviceDetect";
import {sleep} from "@/ts/global/sleep";
import {joinUsHeaderLogoImg_Click} from "@/ts/index/fun";


export async function CheckSystemTheme() {
  let html = document.querySelector("html");
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)"); // 是深色
  if (isDarkTheme.matches) {
    //深色
    html.setAttribute("data-theme", "dark");
  } else {
    //非深色
    html.setAttribute("data-theme", "light");
  }
}

$(function () {
  CheckSystemTheme().then(() => {});

  // noinspection JSUnresolvedReference
  if (navigator.connection != null) {
    if (navigator.connection.type === "cellular") {
      showToast("检测到当前使用计费网络，已自动切换为省流模式", 4000, "main-toast").then(() => {});
      SetResourceMode('low', true);
    } else {
      // noinspection JSUnresolvedReference
      if (navigator.connection.effectiveType !== "4g")
        showToast("检测到当前网络速度缓慢，请耐心等待", 3500, "main-toast").then(() => {});
    }
  }
  
  {
    const  resMode=GetResourceMode();
    loadMediaResources(resMode).then(() => {});
    document.getElementById("resourceModeBox_select").value = resMode;
  }

  GetScrollEffectFromCookieAndSet();
});

export function BodyOnLoad() {
  LoadingOver();
}

export function pingServerView_Click(){
  pingServer_Start();
}

export function effectCheckBox_Change(checked){
  SetScrollEffect(checked);
}

//#region loading
export function mainldskipbt_click(num){
  LoadingOver(num);
}
export function mainldbgswap_change(){
  bgSwap_Change();
}
//#endregion

//#region loadResources
export function resourceModeBox_select_onchange(value){
  userSelectResourceMode(value);
}
//#endregion

//#region bigViewForImage
export function bigViewForImage_click(){
  bvfiClick().then(() => {});
}
export function photoBoxGroup1_click(e) {
  imageClick(e).then(() => {});
}
//#endregion

//#region photo_sub2
export function photo_sub2_target_click(){
  if (isMobile)
    pistonPushPhotoAnim_SpeedSet(-20);
}
let photo_sub2_target_mouse =false;
export function photo_sub2_target_mouseover(){
  if (!isMobile && !photo_sub2_target_mouse){
    async function run(){
      photo_sub2_target_mouse=true;
      while (photo_sub2_target_mouse){
        pistonPushPhotoAnim_SpeedSet(-5);
        await sleep(50);
      }
    }
    run();
  }
}
export function photo_sub2_target_mouseout(){
  if (!isMobile){
    photo_sub2_target_mouse =false;
  }
}
//#endregion

//#region other
export function joinUsHeaderLogoImg_click(){
  joinUsHeaderLogoImg_Click()
}
//#endregion