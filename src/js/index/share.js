import $ from 'jquery';
import 'web-simple-toast/dist/css/toast.min.css';
import {showToast} from 'web-simple-toast';
import {getTranslation} from "@/ts/global/i18n";

//https://github.com/overtrue/share.js
import 'social-share.js/dist/css/share.min.css';
import 'social-share.js/dist/js/social-share.min';


export function shareWindowInfoCopyBtn_Click(){
    navigator.clipboard.writeText(document.getElementById('share-window-info-textBox').value);

    showToast(getTranslation('index.navbar.share_page.code.copy_succeed'), 2000, "share-window-toast",undefined, "share-window");
}
export function OpenSharePage(){
    {
        document.getElementById("share-window-info-qrcodeImg").src="assets/img/copy/mjyy-qrcode.png";//动态加载，避免延长加载时间
        document.getElementById("share-window-info-textBox").value="https://mjyy.top";
    }

    $("#share-page").fadeIn();
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('share-page').addEventListener('click', function() {
        $("#share-page").fadeOut();
      });
      document.getElementById('share-window').addEventListener('click', function(event) {
        //点击子容器不退出
        // 阻止事件冒泡到父元素
        event.stopPropagation();
      });
});