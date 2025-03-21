import {pistonPushPhotoAnim_Init} from '@/ts/index/pageScrollEffect';

var resourceMode;

export function GetResourceMode() {
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    if (resourceMode == null) {
        const cDat = getCookie("resourceMode");
        if (cDat != null)
            resourceMode = cDat;
        else
            resourceMode = "normal";
    }
    return resourceMode;
}

export function SetResourceMode(value, dtSetCookie = false) {
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    if (!dtSetCookie) setCookie("resourceMode", value, 7);
    resourceMode = value;
}

export function userSelectResourceMode(value) {
    SetResourceMode(value);
    loadMediaResources(value);
}


export async function loadMediaResources(resMode) {
    //视频资源加载
    {
        const targetBoxs =document.querySelectorAll(".video-page_video-box");
        {
            const urls=[
                "//player.bilibili.com/player.html?aid=113259596223254&bvid=BV16j1qYdE2U&cid=26166823217&page=1&high_quality=1&danmaku=0&autoplay=0",
                "//player.bilibili.com/player.html?aid=113481005274537&bvid=BV1FCULY6Eoq&cid=26757105167&page=1&high_quality=1&danmaku=0&autoplay=0"
            ]
            let i=0;
            targetBoxs.forEach(targetBox => {
                switch (resMode) {
                    case "low":
                        targetBox.innerHTML = "<p style=\"text-align: center;width: 100%;position: relative\">省流模式下将不会加载宣传视频</p>";
                        break;
                    case "normal":
                    default:
                        // noinspection HtmlDeprecatedAttribute
                        targetBox.innerHTML =
                            "<div class=\"card\" style=\"z-index: 1; position: relative;height: 100%;width: 100%;\">\n" +
                            "    <iframe src=\""+ urls[i] +"\" class=\"card-img-top rounded\" style=\"height: 100%;width: 100%;\" \n" +
                            "allowfullscreen=\"allowfullscreen\"  scrolling=\"no\" frameborder=\"0\" sandbox=\"allow-top-navigation allow-same-origin allow-forms allow-scripts\"></iframe>\n" +
                            "</div>\n";
                        break;
                }
                i++;
            });
        }
    }
    //md文件加载
    {
        function loadTextFile(path) {
            return new Promise((resolve, reject) => {
                fetch(path)
                    .then((response) => response.text())
                    .then((readText) => {
                        resolve(readText);
                    })
                    .catch(() => {
                        reject(new Error(`文本资源\'{path}\'加载失败`));
                    });
            });
        }

        const mdRes = [
            ["assets/md/index/serverRule.md", "ruleText"],
            ["assets/md/index/serverIntroductory.md", "serverIntroductoryText"],
            ["assets/md/index/joinUs.md", "joinUsText"],
        ];
        for (let i = 0; i < mdRes.length; i++) {
            document.getElementById(mdRes[i][1]).innerHTML =
                marked.parse(await loadTextFile(mdRes[i][0]));
        }
    }
    //图片资源加载
    {
        //加载图像资源函数
        function loadImage(url,overCall=(su)=>{}) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve(img);
                    overCall(true);
                };
                img.onerror = () => {
                    reject(new Error(`图片资源\"${url}\"加载失败`));
                    overCall(false);
                };
                img.src = url;
            });
        }

        {
            let imgUrls;
            switch (resMode) {
                case "source":
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/01/13/main2-light.png",
                        "http://cdnjson.com/images/2025/01/13/main2-dark.png",

                        "http://cdnjson.com/images/2025/03/19/bg1-light.png",
                    ];
                    break;
                case "low":
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/03/18/main2-light-low2.png",
                        "http://cdnjson.com/images/2025/03/18/main2-dark-low2.png",

                        "http://cdnjson.com/images/2025/03/19/bg1-light-low2.jpg",
                    ];
                    break;
                case "normal":
                default:
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/01/15/main2-light-low.png",
                        "http://cdnjson.com/images/2025/01/15/main2-dark-low.png",

                        "http://cdnjson.com/images/2025/03/19/bg1-light-low.jpg",
                    ];
                    break;
            }
            for (let i = 0; i < imgUrls.length; i++) {
                try {
                    await loadImage(imgUrls[i]);
                    if (i <= 1) {
                        let name;
                        switch (i) {
                            case 0:
                                name = "--home-wrapper_img-url_light";
                                break;
                            case 1:
                                name = "--home-wrapper_img-url_dark";
                                break;
                        }
                        document.documentElement.style.setProperty(name, `url(${imgUrls[i]})`);
                    }
                    else{
                        switch (i){
                            case 2:
                                document.getElementById('main-background_img').src=imgUrls[i];
                                break;
                        }
                    }
                } catch {
                }
            }
        }
        {
            async function deployImg(imgUrls,allImgBoxs,allLoadingBoxs){
                for (let i = 0; i < imgUrls.length; i++) {
                    allLoadingBoxs[i].setAttribute("data-show", true);//触发加载动画
                }
                for (let i = 0; i < imgUrls.length; i++) {
                    try {
                        await loadImage(imgUrls[i],
                            (su) => {
                                allLoadingBoxs[i].setAttribute("data-show", false);
                            });
                    } catch {
                    }
                    finally {
                        allImgBoxs[i].src = imgUrls[i];
                    }
                }
            }
            {
                let imgUrls;
                switch (resMode) {
                    case "source":
                        // noinspection HttpUrlsUsage
                        imgUrls = [
                            "http://cdnjson.com/images/2025/03/18/photo-21.png",
                            "http://cdnjson.com/images/2024/12/28/photo-2.png",
                            "http://cdnjson.com/images/2024/12/28/photo-18.png",
                            //"http://cdnjson.com/images/2024/12/28/photo-4.png",

                            "http://cdnjson.com/images/2024/12/28/photo-15.png",
                            "http://cdnjson.com/images/2024/12/28/photo-17.png",
                            "http://cdnjson.com/images/2025/03/18/photo-22.png",
                            "http://cdnjson.com/images/2024/12/28/photo-6.png",
                            "http://cdnjson.com/images/2024/12/28/photo-5.png",
                            "http://cdnjson.com/images/2025/03/18/photo-23.png",
                            "http://cdnjson.com/images/2025/03/18/photo-24.png",
                            "http://cdnjson.com/images/2025/03/18/photo-25.png",
                            "http://cdnjson.com/images/2024/12/28/photo-7.png",
                            "http://cdnjson.com/images/2024/12/28/photo-8.png",
                            "http://cdnjson.com/images/2024/12/28/photo-9.png",
                            "http://cdnjson.com/images/2024/12/28/photo-10.png",
                            "http://cdnjson.com/images/2024/12/28/photo-11.png",
                            "http://cdnjson.com/images/2024/12/28/photo-12.png",
                            "http://cdnjson.com/images/2024/12/28/photo-19.png",
                            "http://cdnjson.com/images/2024/12/28/photo-20.png",
                            "http://cdnjson.com/images/2024/12/28/photo-13.png",
                            "http://cdnjson.com/images/2024/12/28/photo-14.png",
                        ];
                        break;
                    case "low":
                        // noinspection HttpUrlsUsage
                        imgUrls = [
                            "http://cdnjson.com/images/2025/03/18/photo-21-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-2-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-18-low2.jpg",
                            //"http://cdnjson.com/images/2025/03/18/photo-4-low2.jpg",

                            "http://cdnjson.com/images/2025/03/18/photo-15-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-17-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-22-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-6-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-5-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-23-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-24-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-25-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-7-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-8-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-9-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-10-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-11-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-12-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-19-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-20-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-13-low2.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-14-low2.jpg",
                        ];
                        break;
                    default:
                    case "normal":
                        // noinspection HttpUrlsUsage
                        imgUrls = [
                            "http://cdnjson.com/images/2025/03/18/photo-21-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-2-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-18-low.jpg",
                            //"http://cdnjson.com/images/2025/01/15/photo-4-low.jpg",

                            "http://cdnjson.com/images/2025/01/15/photo-15-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-17-low.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-22-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-6-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-5-low.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-23-low.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-24-low.jpg",
                            "http://cdnjson.com/images/2025/03/18/photo-25-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-7-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-8-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-9-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-10-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-11-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-12-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-19-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-20-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-13-low.jpg",
                            "http://cdnjson.com/images/2025/01/15/photo-14-low.jpg",
                        ];
                        break;
                }
                await deployImg(
                    imgUrls,
                    document.querySelectorAll(".photoBoxGroup-1:not(.loadingBox)"),
                    document.querySelectorAll(".loadingBox.photoBoxGroup-1")
                );

                pistonPushPhotoAnim_Init();//在photoBoxGroup-1的内容加载完毕时初始化活塞推动照片动画
            }
            {
                await deployImg(
                    [
                        //"http://cdnjson.com/images/2024/12/28/photo-14.png",
                        "assets/img/qqGroupQRcode.webp",
                    ],
                    document.querySelectorAll(".photoBoxGroup-2:not(.loadingBox)"),
                    document.querySelectorAll(".loadingBox.photoBoxGroup-2")
                );
            }
        }
    }

    LoadingOver();

}
