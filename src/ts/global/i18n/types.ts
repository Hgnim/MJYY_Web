export type localeKey = 'zh-CN' | 'en-US';

//json语言文件的结构类型
export type langsStruType = {
    global:{
        mjyy:string;
    },
    index:{
    }
};

// 翻译参数类型
//export type TranslateParams = Record<string, string | number>;

// 事件回调类型
//export type LocaleChangeCallback = (locale: localeKey) => void;