import {pingServer_Start} from "@/ts/index/pingServer";
import {imageClick,bvfiClick} from "@/ts/index/bigViewForImage";
import {loadMediaResources,userSelectResourceMode,SetResourceMode,GetResourceMode} from "@/ts/index/loadResources";
import {LoadingOver} from '@/ts/index/loading';

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
});

export function BodyOnLoad() {
  LoadingOver();
}

export function pingServerView_Click(){
  pingServer_Start();
}

//#region loading
export function mainldskipbt_click(num){
  LoadingOver(num);
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