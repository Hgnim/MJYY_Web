/*
* 全局桥接文件
* 该脚本是用于将一些旧的脚本中的函数等定义全部引入并暴露于全局中
* 因为之前通过html script引入的脚本中的定义都是暴露于全局的，所以在此处需要还原并以最小的代价恢复其功能
* */
import {exposeModuleToGlobal} from './global-bridge';


import '@/css/index/theme.css';
import '@/css/publicStyle.css';
import '@/css/index/style.css';
import '@/css/publicNavbar.css';
import '@/css/index/navbar.css';
import '@/css/index/linkText.css';

import/* * as publicNavbar from*/ '@/js/publicNavbar.js';//exposeModuleToGlobal(publicNavbar);
import/* * as navbar from*/ '@/js/index/navbar.js';//exposeModuleToGlobal(navbar);

import '@/css/index/share.css';
import * as share from '@/js/index/share.js';exposeModuleToGlobal(share);

import/* * as pageSmoothScroll from*/ '@/js/index/pageSmoothScroll.js';//exposeModuleToGlobal(pageSmoothScroll);
import * as viewAction from '@/js/index/view_action.js';exposeModuleToGlobal(viewAction);
import/* * as titleChange from*/ '@/js/index/titileChange.js';//exposeModuleToGlobal(titleChange);

import '@/css/index/loading.css';
import * as loading from '@/js/index/loading.js';exposeModuleToGlobal(loading);
import '@/css/index/imageResource.css';
import * as loadResources from '@/js/index/loadResources.js';exposeModuleToGlobal(loadResources);
import '@/css/index/resourceMode.css';

import '@/css/index/themeToggle.css';

import '@/css/index/pingServer.css';
import * as pingServer from '@/js/index/pingServer.js';exposeModuleToGlobal(pingServer);

import * as script from '@/js/index/script.js';exposeModuleToGlobal(script);



import '@/js/index/MoreLineEffect';
import '@/js/index/imgFalling'