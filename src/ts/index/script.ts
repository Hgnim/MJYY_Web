import {langInitLoadDone, switchLanguage} from "@/ts/global/i18n/langChange";
import {sleep} from "@/ts/global/sleep";
import {localeKey} from "@/ts/global/i18n/types";
import {getLocale} from "@/ts/global/i18n";

/*(async (): Promise<void> => {
    await sleep(2000);
    await switchLanguage("en-US");
})();*/


export async function langSelect_Change(lang:localeKey){
    await switchLanguage(lang);
}
(window as any).langSelect_Change=langSelect_Change;

(async()=> {
//langInitLoadDone.call.push((lang):void=>{
    while (!langInitLoadDone.ready){await sleep(100);}
    const lang:localeKey=getLocale();
    //获取当前语言并显示在语言选择UI
    const e: HTMLInputElement | null = document.getElementById(`lang_${(lang.split('-')[0] + lang.split('-')[1]).toLowerCase()}`) as HTMLInputElement;
    if (e) {
        e.checked = true;
    }
//})
})();


/*document.addEventListener('DOMContentLoaded', function () {
});*/