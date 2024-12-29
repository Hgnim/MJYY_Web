document.addEventListener('DOMContentLoaded', function () {
    pingServer_Start();
});
var pingServerRunLock = false;
var pingServerLoaderLock=false;//用于等待动画组件动画播放完成，避免监听事件滞留
function pingServer_Start() {
    if (!pingServerRunLock && !pingServerLoaderLock) {
        pingServerRunLock = true;

        var pss_l;
        var pss_f;
        var pss_s;
        {
            var psv_cs = getComputedStyle(document.querySelector('#pingServerView'));
            pss_l = psv_cs.getPropertyValue('--pingServerState-loading');
            pss_f = psv_cs.getPropertyValue('--pingServerState-failed');
            pss_s = psv_cs.getPropertyValue('--pingServerState-succeed');
        }
        var psl = document.getElementById("pingServerLoader");
        var pst = document.getElementById("pingServerText");

        psl.style.background = pss_l;
        pst.style.color = pss_l;
        psl.style.animation = "pingServerLoader_loop 1s infinite forwards";
        pst.innerText = "正在检测服务器在线状态......";
        $("#pingServerRootView").fadeIn();

        var oneShot = false;
            if (!oneShot) {
                function pslLoopStop() {
                    // 设置动画迭代次数为0，让动画在完成当前迭代后停止
                    psl.style.animationIterationCount = 0;
                    psl.removeEventListener('animationiteration',pslLoopStop);
                    pingServerLoaderLock=false;
                }
                pingServerLoaderLock=true;
                // 监听动画迭代结束事件
                psl.addEventListener('animationiteration',pslLoopStop);
                
                            psl.style.background = pss_f;
                            pst.style.color = pss_f;
                            pst.innerText = "开发分支中不进行检测";
            }
        pingServerRunLock =false;
    }
}