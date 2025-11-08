import {getLocale, loadLocale, setLocale} from "@/ts/global/i18n/index";
import {localeKey} from "@/ts/global/i18n/types";
import {getCookie, setCookie} from "@/ts/global/cookie";

//语言初始化加载完成后将会调用该函数
export let langInitLoadDone:{call:((lang:localeKey)=>void)|null}={call: null};

async function init() {
    {
        //启动时扫描cookie是否有保存更改过语言的配置，如果没有则直接加载语言（直接加载则是用户默认语言）
        const cookieLang=getCookie('lang');
        if (cookieLang)
            await setLocale(cookieLang as localeKey);
        else
            await loadLocale();
    }
    if (langInitLoadDone.call)
        langInitLoadDone.call(getLocale());
}

//切换语言
export async function switchLanguage(lang: localeKey){
    if (getLocale() === lang) return;
    setCookie('lang',lang, 365);//保存
    await setLocale(lang);
}
//(window as any).switchLanguage = switchLanguage;


document.addEventListener('DOMContentLoaded', async () => {
    //启动
    await init().catch(console.error);
});
