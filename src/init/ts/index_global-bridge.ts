/*
* 全局桥接文件
* 该脚本是用于将一些旧的脚本中的函数等定义全部引入并暴露于全局中
* 因为之前通过html script引入的脚本中的定义都是暴露于全局的，所以在此处需要还原并以最小的代价恢复其功能
* */
import {exposeModuleToGlobal} from './global-bridge';


import '@/assets/css/index/theme.css';
import '@/assets/css/publicStyle.css';
import '@/assets/css/index/style.css';
import '@/assets/css/publicNavbar.css';
import '@/assets/css/index/navbar.css';
import '@/assets/css/index/linkText.css';

import/* * as publicNavbar from*/ '@/js/publicNavbar.js';//exposeModuleToGlobal(publicNavbar);
import/* * as navbar from*/ '@/js/index/navbar.js';//exposeModuleToGlobal(navbar);

import '@/assets/css/index/share.css';
import * as share from '@/js/index/share.js';exposeModuleToGlobal(share);

import/* * as pageSmoothScroll from*/ '@/js/index/pageSmoothScroll.js';//exposeModuleToGlobal(pageSmoothScroll);
import * as viewAction from '@/js/index/view_action.js';exposeModuleToGlobal(viewAction);
import/* * as titleChange from*/ '@/js/index/titileChange.js';//exposeModuleToGlobal(titleChange);

import '@/assets/css/index/imageResource.css';
import '@/assets/css/index/resourceMode.css';


import * as script from '@/js/index/script.js';exposeModuleToGlobal(script);



//import '@/js/index/MoreLineEffect';
import '@/js/index/imgFalling'