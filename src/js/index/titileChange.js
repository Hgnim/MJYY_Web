import {langInitLoadDone} from "@/ts/global/i18n/langChange";
import {sleep} from "@/ts/global/sleep";
import {getTranslation} from "@/ts/global/i18n";

(async ()=>{
    while (!langInitLoadDone.ready){await sleep(100);}
var titleTime;
document.addEventListener("visibilitychange", (function () {
    document.hidden ? (document.title = getTranslation('index.head.code.title_leave') + getTranslation('index.head.title'), clearTimeout(titleTime)) : (document.title = getTranslation('index.head.code.title_back') + getTranslation('index.head.title'), titleTime = setTimeout((function () {
        document.title = getTranslation('index.head.title')
    }), 2e3))
}))
})();
