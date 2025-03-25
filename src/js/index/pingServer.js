document.addEventListener('DOMContentLoaded', function () {
    pingServer_Start();
});
var pingServerRunLock = false;//主要检测锁，避免重复检测(对服务器的网站进行ping检测来实现快速判断是否在线)
//var pingServerRunLock2 = false;//备用检测锁，避免重复检测，当两个检测锁同时为false时，才会进行检测(通过第三方API检测，成功率较低)
var pingServerLoaderLock = false;//用于等待动画组件动画播放完成，避免监听事件滞留
export function pingServer_Start() {
    if (!pingServerRunLock  && !pingServerLoaderLock) {
        pingServerRunLock = true;

        const PssEnum = {
            l: 0,
            f: 1,
            s: 2,
            hf: 3,
            hs: 4
        }
        var pss;
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
        function StopPslLoop() {
            function pslLoopStop() {
                // 设置动画迭代次数为0，让动画在完成当前迭代后停止
                psl.style.animationIterationCount = 0;
                psl.removeEventListener('animationiteration', pslLoopStop);
                pingServerLoaderLock = false;
            }
            pingServerLoaderLock = true;
            // 监听动画迭代结束事件
            psl.addEventListener('animationiteration', pslLoopStop);
        }
        function ChangePss(id) {
            switch (id) {
                case 0:
                    pss = PssEnum.l;
                    psl.style.background = pss_l;
                    pst.style.color = pss_l;
                    psl.style.animation = "pingServerLoader_loop 1s infinite forwards";
                    pst.innerText = "正在检测服务器在线状态......";
                    break;
                case 1:
                    pss = PssEnum.hf;
                    psl.style.background = pss_hf;
                    pst.style.color = pss_hf;
                    pst.innerText = "尝试用备用方案检测在线状态......";
                    break;
                case 2:
                    pss = PssEnum.hs;
                    psl.style.background = pss_hs;
                    pst.style.color = pss_hs;
                    pst.innerText = "与MC服务器的连接正常";
                    break;
                case 3:
                    pss = PssEnum.s;
                    psl.style.background = pss_s;
                    pst.style.color = pss_s;
                    pst.innerText = "Minecraft服务器在线";
                    break;
                case 4:
                case 5:
                case 6:
                case 7:
                    pss = PssEnum.f;
                    psl.style.background = pss_f;
                    pst.style.color = pss_f;
                    switch (id) {
                        case 4:
                            pst.innerText = "Minecraft服务器已离线";
                            break;
                        case 5:
                            pst.innerText = "Minecraft服务器请求超时";
                            break;
                        case 6:
                            pst.innerText = "在线状态检查失败，请稍后尝试";
                            break;
                        case 7:
                            pst.innerText = "当前网络无法连接至MC服务器";
                            break;
                    }
                    break;
            }
        }

        ChangePss(0);
        $("#pingServerRootView").fadeIn();


        function Action(response = null) {
            if (response != null) {
                if (response.online === true) {
                    ChangePss(3);
                    document.getElementById("pingServerInfo_icon").src = response.icon;
                    document.getElementById("pingServerInfo_text_player").innerText = `玩家数: ${response.players.online}/${response.players.max}`;
                    document.getElementById("pingServerInfo_text_motd").innerHTML = response.motd.html.replace(/<span>[^>]*\n[^<]*<\/span>/, "<br>");
                    //document.getElementById("pingServerInfo_text_motd2").innerText = response.motd2;
                    document.getElementById("pingServerInfo").style.display = "flex";
                    StopPslLoop();
                } else {
                    ChangePss(4);
                    StopPslLoop();
                }
                pingServerRunLock = false;
            } else {
                //使用备用方案
                ChangePss(1);
                Action2();
            }
        }

        function Action2(){
            //备用方案
            new Ping({ favicon: "/usePing.png", logError: false, timeout: 30000 }).ping("https://web.mjyy.top/minecraft/playerachievement/", function (err) {
                if (err) {
                    //如果备用检测未成功，则输出失败信息
                    ChangePss(7);
                    StopPslLoop();
                }
                else {
                    ChangePss(2);
                    StopPslLoop();
                }
                pingServerRunLock = false;
            });
        }

        require('node-mcstatus').statusJava('mc.mjyy.top', '30303',{query:false,timeout:20.0})
            .then((result) => {
                // `result` will be the same shape and
                // properties as what is documented on
                // our website.
                // https://mcstatus.io/docs#java-status
                //console.log(result);
                Action(result);
            })
            .catch((error) => {
                // If the server is offline, then
                // you will NOT receive an error here.
                // Instead, you will use the `result.online`
                // boolean values in `.then()`.
                // Receiving an error here means that there
                // was an error with the service itself.
                Action(null);
            })
    }
}