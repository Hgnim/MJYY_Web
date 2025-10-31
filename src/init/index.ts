import '@/assets/scss/bootstrap/custom.scss';
import '@/assets/scss/index/bootstrap/custom.scss';

import '@/ts/global/cookie';

import '@/assets/css/index/loading.css';
import '@/ts/index/loading';

import '@/assets/scss/index/pingServer.scss';
import '@/ts/index/pingServer';

import './ts/index_global-bridge';

import '@/assets/css/index/pace_override.css';

import  '@/assets/scss/index/pageScrollEffect.scss'
import  '@/ts/index/pageScrollEffect';

import {ruleText_Button_Click} from '@/ts/index/pageScrollEffect';
(window as any).ruleText_Button_Click = ruleText_Button_Click;//将该函数暴露至全局

import '@/assets/scss/index/bigViewForImage.scss';

import '@/assets/scss/index/style.scss';