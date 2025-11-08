import {sleep} from "@/ts/global/sleep";
import {getTranslation} from "@/ts/global/i18n";
import {langInitLoadDone} from "@/ts/global/i18n/langChange";

document.addEventListener('DOMContentLoaded', async function () {
    //等待多语言框架初始化完成
    while (!langInitLoadDone.ready){await sleep(100);}
    pingServer_Start();
});
let pingServerRunLock = false;//主要检测锁，避免重复检测(对服务器的网站进行ping检测来实现快速判断是否在线)
//var pingServerRunLock2 = false;//备用检测锁，避免重复检测，当两个检测锁同时为false时，才会进行检测(通过第三方API检测，成功率较低)
let pingServerLoaderLock = false;//用于等待动画组件动画播放完成，避免监听事件滞留
export function pingServer_Start() {
    switch (process.env.NODE_ENV){//判断当前webpack是发布模式还是开发模式，以确定是否启用服务器在线状态检测
        case "production":{
            if (!pingServerRunLock  && !pingServerLoaderLock) {
                pingServerRunLock = true;

                const PssEnum = {
                    l: 0,
                    f: 1,
                    s: 2,
                    hf: 3,
                    hs: 4
                }
                let pss;
                const psv_cs = getComputedStyle(document.querySelector('#pingServerView') as Element);
                const pss_l: string = psv_cs.getPropertyValue('--pingServerState-loading'),
                    pss_f: string= psv_cs.getPropertyValue('--pingServerState-failed'),
                    pss_s: string= psv_cs.getPropertyValue('--pingServerState-succeed'),
                    pss_hf: string= psv_cs.getPropertyValue('--pingServerState-halfFailed'),
                    pss_hs: string= psv_cs.getPropertyValue('--pingServerState-succeed');

                let psl:HTMLElement = document.getElementById("pingServerLoader")!;
                let pst:HTMLElement = document.getElementById("pingServerText")!;
                function StopPslLoop() {
                    function pslLoopStop() {
                        // 设置动画迭代次数为0，让动画在完成当前迭代后停止
                        psl.style.animationIterationCount = '0';
                        psl.removeEventListener('animationiteration', pslLoopStop);
                        pingServerLoaderLock = false;
                    }
                    pingServerLoaderLock = true;
                    // 监听动画迭代结束事件
                    psl.addEventListener('animationiteration', pslLoopStop);
                }
                function ChangePss(id:number) {
                    switch (id) {
                        case 0:
                            pss = PssEnum.l;
                            psl.style.background = pss_l;
                            pst.style.color = pss_l;
                            psl.style.animation = "pingServerLoader_loop 1s infinite forwards";
                            pst.innerText = getTranslation('index.home.ping_server.code.id0');
                            break;
                        case 1:
                            pss = PssEnum.hf;
                            psl.style.background = pss_hf;
                            pst.style.color = pss_hf;
                            pst.innerText = getTranslation('index.home.ping_server.code.id1');
                            break;
                        case 2:
                            pss = PssEnum.hs;
                            psl.style.background = pss_hs;
                            pst.style.color = pss_hs;
                            pst.innerText = getTranslation('index.home.ping_server.code.id2');
                            break;
                        case 3:
                            pss = PssEnum.s;
                            psl.style.background = pss_s;
                            pst.style.color = pss_s;
                            pst.innerText = getTranslation('index.home.ping_server.code.id3');
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
                                    pst.innerText = getTranslation('index.home.ping_server.code.id4');
                                    break;
                                case 5:
                                    pst.innerText = getTranslation('index.home.ping_server.code.id5');
                                    break;
                                case 6:
                                    pst.innerText = getTranslation('index.home.ping_server.code.id6');
                                    break;
                                case 7:
                                    pst.innerText = getTranslation('index.home.ping_server.code.id7');
                                    break;
                            }
                            break;
                    }
                }

                ChangePss(0);
                $("#pingServerRootView").fadeIn();


                async function Action(response = null) {
                    try{
                        async function backupPlan(){
                            ChangePss(1);
                            {
                                let lock:boolean=false;
                                //备用方案
                                //@ts-ignore:2339
                                new Ping({ favicon: "/ping.png", logError: false, timeout: 30000 }).ping("https://web.mjyy.top/tool", function (err) {
                                    if (err) {
                                        //如果备用检测未成功，则输出失败信息
                                        ChangePss(7);
                                    }
                                    else {
                                        ChangePss(2);
                                    }
                                    lock=true;
                                });
                                while (!lock){
                                    await sleep(10);
                                }
                            }
                        }
                        if (response != null) {
                            //@ts-ignore:2339
                            if (response.online === true) {
                                ChangePss(3);
                                //@ts-ignore:2339
                                document.getElementById("pingServerInfo_icon")!.src = response.icon;
                                //@ts-ignore:2339
                                document.getElementById("pingServerInfo_text_player")!.innerText = `${getTranslation('index.home.ping_server.code.player_online_num')}${response.players.online}/${response.players.max}`;
                                {
                                    const plist:HTMLElement=document.getElementById("pingServerInfo_text_playerList")!;
                                    plist.innerHTML=`<b>${getTranslation('index.home.ping_server.code.player_online_num2')}</b><br>`;
                                    //@ts-ignore:2339
                                    response.players.list.forEach((pl: any) => {
                                        plist.innerHTML+=`${pl.name_html}<br>`;
                                    });
                                }
                                //@ts-ignore:2339
                                document.getElementById("pingServerInfo_text_motd")!.innerHTML = response.motd.html.replace(/<span>[^>]*\n[^<]*<\/span>/, "<br>");
                                //document.getElementById("pingServerInfo_text_motd2").innerText = response.motd2;
                                document.getElementById("pingServerInfo")!.style.display = "flex";
                            } else {
                                ChangePss(4);
                                await sleep(1500);
                                await backupPlan();
                            }
                        } else {
                            //使用备用方案
                            await backupPlan();
                        }
                    }catch {
                        ChangePss(6);
                    }
                    finally {
                        StopPslLoop();
                        pingServerRunLock = false;
                    }
                }

                require('node-mcstatus').statusJava('mc.mjyy.top', '25565',{query:false,timeout:20.0})
                    .then((result:any) => {
                        // `result` will be the same shape and
                        // properties as what is documented on
                        // our website.
                        // https://mcstatus.io/docs#java-status
                        //console.log(result);
                        Action(result);
                    })
                    .catch((error:any) => {
                        // If the server is offline, then
                        // you will NOT receive an error here.
                        // Instead, you will use the `result.online`
                        // boolean values in `.then()`.
                        // Receiving an error here means that there
                        // was an error with the service itself.
                        Action(null);
                    })
            }
        }break;
        case "development":{
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
        pst.innerText = getTranslation('index.home.ping_server.code.no_check');
    }
        }break;
        default:
            console.error("pingServer_Start函数中的process.env.NODE_ENV判断异常！");
            break;
    }
}