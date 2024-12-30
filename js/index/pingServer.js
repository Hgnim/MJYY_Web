document.addEventListener('DOMContentLoaded', function () {
    pingServer_Start();
});
var pingServerRunLock = false;
var pingServerLoaderLock=false;//用于等待动画组件动画播放完成，避免监听事件滞留
function pingServer_Start() {
    if (!pingServerRunLock && !pingServerLoaderLock) {
        pingServerRunLock = true;

        var pss_l, pss_f, pss_s, pss_hf, pss_hs;
        {
            var psv_cs = getComputedStyle(document.querySelector('#pingServerView'));
            pss_l = psv_cs.getPropertyValue('--pingServerState-loading');
            pss_f = psv_cs.getPropertyValue('--pingServerState-failed');
            pss_s = psv_cs.getPropertyValue('--pingServerState-succeed');
            pss_hf = psv_cs.getPropertyValue('--pingServerState-halfFailed');
            pss_hs = psv_cs.getPropertyValue('--pingServerState-succeed');
        }
        var psl = document.getElementById("pingServerLoader");
        var pst = document.getElementById("pingServerText");

        psl.style.background = pss_l;
        pst.style.color = pss_l;
        psl.style.animation = "pingServerLoader_loop 1s infinite forwards";
        pst.innerText = "正在检测服务器在线状态......";
        $("#pingServerRootView").fadeIn();

        new Ping({ favicon: "/icon.png", logError: false, timeout: 30000 }).ping("https://web.mjyymc.fun/minecraft/messagepage", function (err) {
            if (pingServerRunLock) {//只有在检测的时候才会更新状态，避免滞留
                if (err) {
                    psl.style.background = pss_hf;
                    pst.style.color = pss_hf;
                    pst.innerText = "尝试用备用方案检测在线状态......";
                }
                else {
                    psl.style.background = pss_hs;
                    pst.style.color = pss_hs;
                    pst.innerText = "与MC服务器的连接正常";
                }
            }
        });

        function Action(response = null, status = null) {
            function pslLoopStop() {
                // 设置动画迭代次数为0，让动画在完成当前迭代后停止
                psl.style.animationIterationCount = 0;
                psl.removeEventListener('animationiteration', pslLoopStop);
                pingServerLoaderLock = false;
            }
            pingServerLoaderLock = true;
            // 监听动画迭代结束事件
            psl.addEventListener('animationiteration', pslLoopStop);

            if (response != null) {
                if (response.code == 200) {
                    psl.style.background = pss_s;
                    pst.style.color = pss_s;
                    pst.innerText = "Minecraft服务器在线";
                    document.getElementById("pingServerInfo_icon").src = response.img;
                    document.getElementById("pingServerInfo_text_player").innerText = "玩家数: " + response.players;
                    document.getElementById("pingServerInfo_text_motd1").innerText = response.motd;
                    document.getElementById("pingServerInfo_text_motd2").innerText = response.motd2;
                    document.getElementById("pingServerInfo").style.display = "flex";
                } else {
                    psl.style.background = pss_f;
                    pst.style.color = pss_f;
                    pst.innerText = "Minecraft服务器已离线";
                }
            } else {
                psl.style.background = pss_f;
                pst.style.color = pss_f;
                if (status === "timeout") {
                    pst.innerText = "Minecraft服务器请求超时";
                }
                else {
                    pst.innerText = "在线状态检查失败，请稍后尝试";
                }
            }
            pingServerRunLock = false;
        }
        $.ajax({
            url: 'https://proxy.cors.sh/https://uapis.cn/api/mcserver?server=113.219.237.106:30303',//通过公共CORS代理，避免跨域请求错误
            type: "GET",
            timeout: 60000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Access-Control-Allow-Origin': '*'
            },
            contentType: "application/json",
            success: function (response) {
                Action(response);
            },
            error: function (status) {
                Action(null, status);
            }
        });
    }
}