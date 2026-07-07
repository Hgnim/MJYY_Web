import {onMounted, ref, type Ref} from "vue";
import {useCookies} from "@vueuse/integrations/useCookies";

//主题，用于data-bs-theme
export type Theme = 'light'|'dark';
//主题类型，用于data-theme-type
export type ThemeType = 'auto'|'system'|'manual';
//用户选择主题的选项
export type ThemeSelect_Theme='auto'|'system'|Theme;

export const themeIcon:Ref<string> = ref("#svg-bsi-circle-half");
export const curSelTheme:Ref<ThemeSelect_Theme> = ref("auto");
export const dataBsTheme:Theme='light';
export const dataThemeType:ThemeType='auto';

export function doThemeSel(tme:ThemeSelect_Theme,setCookie:boolean=true){
    const html:HTMLHtmlElement = document.querySelector("html")!;
    let dataBsTheme_:Theme;
    let dataThemeType_:ThemeType;
    switch(tme){
        case 'auto':
            themeIcon.value = '#svg-bsi-clock';
            {
                const hour=(new Date()).getHours();
                if (hour>=7 && hour<19)
                    dataBsTheme_='light';
                else
                    dataBsTheme_='dark';
            }
            dataThemeType_='auto';
            break;
        case 'system':
            themeIcon.value = '#svg-bsi-circle-half';
            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
                dataBsTheme_='dark';
            else
                dataBsTheme_='light';
            dataThemeType_='system';
            break;
        case 'light':
            themeIcon.value = '#svg-bsi-sun';
            dataBsTheme_='light';
            dataThemeType_='manual';
            break;
        case 'dark':
            themeIcon.value = '#svg-bsi-moon-stars';
            dataBsTheme_='dark';
            dataThemeType_='manual';
            break;
    }
    html.setAttribute('data-bs-theme',dataBsTheme_);
    html.setAttribute('data-theme-type',dataThemeType_);
    curSelTheme.value=tme;
    if (setCookie)
        useCookies().set('theme', tme,{
            maxAge: 60*60*24*365,
        });
}

export function init(){
    onMounted(()=>{
        const theme:ThemeSelect_Theme|undefined=useCookies().get('theme');
        if (theme)
            doThemeSel(theme,false);
        else
            doThemeSel('auto',true);
    });
}
