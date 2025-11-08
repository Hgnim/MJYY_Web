import i18next from 'i18next';
import locI18next from 'loc-i18next';
import {langsStruType, localeKey} from "@/ts/global/i18n/types";
import LanguageDetector from 'i18next-browser-languagedetector';

const i18n = i18next.createInstance();
// noinspection JSIgnoredPromiseFromCall
i18n.use(LanguageDetector).init({
    //使用i18next-browser-languagedetector自动检测用户语言并设置，所以无需手动设置lng项
    //lng: 'zh-CN',//默认语言，其实作用不大，在初始化的时候都会自动设置和加载语言并渲染。
    fallbackLng: ['en-US','zh-CN'],//回退语言，找不到翻译时使用
    resources: {}, //动态加载json语言文件，此处留空
    detection: {
        //navigator：读取浏览器设置(navigator.language)并返回语言设置
        //htmlTag: 不使用，因为是读取<html lang="xxx"，对纯前端没意义
        order: ['navigator'/*, 'htmlTag'*/],
        caches: [], //不做任何缓存，因为我自己会让其进行cookie保存XD
    },
});

//初始化loc-i18next并绑定到i18next
const localize = locI18next.init(i18n, {
    selectorAttr: 'data-i18n',//扫描哪个属性作为翻译key
    optionsAttr: 'data-i18n-opt',//额外参数（如占位符）
    useOptionsAttr: true,//启用参数支持
    parseDefaultValueFromContent: true//如果没找到所对应的翻译，则保留元素原有的文本
});

//动态加载当前语言
export async function loadLocale() {
    const lang=getLocale();
    //加载json解析并注册到i18next
    i18n.addResourceBundle(lang, 'translation', await (await fetch(`/locales/${lang}.json`)).json() as langsStruType);
    //渲染页面（翻译所有[data-i18n]元素）
    localize('body');
}

//获取当前语言
export function getLocale():localeKey{
    return i18n.language as localeKey;
}

//更改当前语言并重载
export async function setLocale(lang:localeKey){
    await i18n.changeLanguage(lang);//切换当前语言
    await loadLocale();
}

//监听语言变化
i18n.on('languageChanged', (lang) => {
    console.log('语言已切换为', lang);
});