import {getLocale, loadLocale, setLocale} from "@/ts/global/i18n/index";
import {localeKey} from "@/ts/global/i18n/types";
import {getCookie, setCookie} from "@/ts/global/cookie";

export const langInitLoadDone:{
    //语言初始化加载完成后将会调用该函数组中的所有函数
    //call:((lang:localeKey)=>void)[],//因为各个都是异步执行，可能存在顺序风险，因此不使用此方法
    ready:boolean,//表示是否初始化完成
}={
    //call: [],
    ready:false
};

async function init() {
    {
        //启动时扫描cookie是否有保存更改过语言的配置，如果没有则直接加载语言（直接加载则是用户默认语言）
        const cookieLang=getCookie('lang');
        if (cookieLang)
            await setLocale(cookieLang as localeKey);
        else
            await loadLocale();
    }
    /*for (const c of langInitLoadDone.call)
        c(getLocale());*/
    langInitLoadDone.ready = true;//加载完成
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
