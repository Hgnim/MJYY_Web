declare module 'loc-i18next' {
    import type { i18n } from 'i18next';

    export interface LocI18nextOptions {
        selectorAttr?: string;//data-i18n
        optionsAttr?: string;//data-i18n-opt
        useOptionsAttr?: boolean;//false
        parseDefaultValueFromContent?: boolean;//false
    }

    //init返回的localize函数
    export type LocalizeFunction = (selector?: string | Element) => void;

    //导出init函数
    const locI18next: {
        init: (i18nextInstance: i18n, options?: LocI18nextOptions) => LocalizeFunction;
    };
    export default locI18next;
}