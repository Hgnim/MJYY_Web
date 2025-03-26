/*
* 全局桥接文件
* 该脚本是用于将一些旧的脚本中的函数等定义全部引入并暴露于全局中
* 因为之前通过html script引入的脚本中的定义都是暴露于全局的，所以在此处需要还原并以最小的代价恢复其功能
* */
import {exposeModuleToGlobal} from './global-bridge';

import '@/assets/css/publicStyle.css';
import '@/assets/css/publicNavbar.css';
import '@/assets/css/CommunityPhotoWall/navbar.css';

import '@/js/publicNavbar.js';
import '@/js/CommunityPhotoWall/navbar.js';

import '@/js/CommunityPhotoWall/photoWall_Load.js';

import '@/assets/css/CommunityPhotoWall/style.css';
import * as script from '@/js/CommunityPhotoWall/script.js';exposeModuleToGlobal(script);