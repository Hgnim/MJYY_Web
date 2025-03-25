document.addEventListener('DOMContentLoaded', function () {
    pingServer_Start();
});
var pingServerRunLock = false;
var pingServerLoaderLock=false;//用于等待动画组件动画播放完成，避免监听事件滞留
export function pingServer_Start() {
    if (!pingServerRunLock && !pingServerLoaderLock) {
        pingServerRunLock = true;

        var pss_hs;
        {
            var psv_cs = getComputedStyle(document.querySelector('#pingServerView')!);
            pss_hs = psv_cs.getPropertyValue('--pingServerState-succeed');
        }
        var psl = document.getElementById("pingServerLoader")!;
        var pst = document.getElementById("pingServerText")!;
        psl.style.animation = "pingServerLoader_loop 1s infinite forwards";
        $("#pingServerRootView").fadeIn();

        function pslLoopStop() {
            // 设置动画迭代次数为0，让动画在完成当前迭代后停止
            psl.style.animationIterationCount = '0';
            psl.removeEventListener('animationiteration',pslLoopStop);
            pingServerLoaderLock=false;
        }
        pingServerLoaderLock=true;
        // 监听动画迭代结束事件
        psl.addEventListener('animationiteration',pslLoopStop);

        psl.style.background = pss_hs;
        pst.style.color = pss_hs;
        pst.innerText = "在开发分支中不进行Minecraft服务器在线检测";
    }
}