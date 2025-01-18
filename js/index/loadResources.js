var resourceMode;

function GetResourceMode() {
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

function SetResourceMode(value, dtSetCookie = false) {
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

function userSelectResourceMode(value) {
    SetResourceMode(value);
    loadMediaResources(value);
}


async function loadMediaResources(resMode) {
    //视频资源加载
    {
        const targetBox = document.getElementById("video-page_video-box");
        switch (resMode) {
            case "low":
                targetBox.innerHTML = "<p style=\"text-align: center;width: 100%;position: relative\">省流模式下将不会加载宣传视频</p>";
                break;
            case "normal":
            default:
                // noinspection HtmlDeprecatedAttribute
                targetBox.innerHTML = "<div class=\"col-sm-6 mb-4\" >\n" +
                    "    <div class=\"card\" style=\"z-index: 1; position: relative;\">\n" +
                    "        <iframe src=\"//player.bilibili.com/player.html?aid=113259596223254&bvid=BV16j1qYdE2U&cid=26166823217&page=1&high_quality=1&danmaku=0&autoplay=0\" class=\"card-img-top rounded\"\n" +
                    "    allowfullscreen=\"allowfullscreen\"  scrolling=\"no\" frameborder=\"0\" sandbox=\"allow-top-navigation allow-same-origin allow-forms allow-scripts\" height=\"300px\"></iframe>\n" +
                    "    </div>\n" +
                    "</div>\n" +
                    "<div class=\"col-sm-6 mb-4\">\n" +
                    "    <div class=\"card\" style=\"z-index: 1; position: relative;\">\n" +
                    "        <iframe  src=\"//player.bilibili.com/player.html?aid=113481005274537&bvid=BV1FCULY6Eoq&cid=26757105167&page=1&high_quality=1&danmaku=0&autoplay=0\" class=\"card-img-top rounded\"\n" +
                    "    allowfullscreen=\"allowfullscreen\"  scrolling=\"no\" frameborder=\"0\" sandbox=\"allow-top-navigation allow-same-origin allow-forms allow-scripts\" height=\"300px\" ></iframe>\n" +
                    "    </div>\n" +
                    "</div>";
                break;
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
            ["/md/index/serverRule.md", "ruleText"],
            ["/md/index/serverIntroductory.md", "serverIntroductoryText"],
            ["/md/index/joinUs.md", "joinUsText"],
        ];
        for (let i = 0; i < mdRes.length; i++) {
            document.getElementById(mdRes[i][1]).innerHTML =
                marked.parse(await loadTextFile(mdRes[i][0]));
        }
    }
    //图片资源加载
    {
        //加载图像资源函数
        function loadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve(img);
                };
                img.onerror = () => {
                    reject(new Error(`图片资源\"${url}\"加载失败`));
                };
                img.src = url;
            });
        }

        {
            let imgUrls;
            switch (resMode) {
                case "low":
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/01/13/main2-light.png",
                        "http://cdnjson.com/images/2025/01/13/main2-dark.png",
                    ];
                    break;
                case "normal":
                default:
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/01/15/main2-light-low.png",
                        "http://cdnjson.com/images/2025/01/15/main2-dark-low.png",
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
                } catch {
                }
            }
        }
        {
            const allImgBoxs = document.querySelectorAll(".photoBoxGroup-1");
            let imgUrls;
            switch (resMode) {
                case "low":
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2025/01/15/photo-16-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-2-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-18-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-4-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-15-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-17-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-5-low.jpg",
                        "http://cdnjson.com/images/2025/01/15/photo-6-low.jpg",
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
                default:
                case "normal":
                    // noinspection HttpUrlsUsage
                    imgUrls = [
                        "http://cdnjson.com/images/2024/12/28/photo-16.png",
                        "http://cdnjson.com/images/2024/12/28/photo-2.png",
                        "http://cdnjson.com/images/2024/12/28/photo-18.png",
                        "http://cdnjson.com/images/2024/12/28/photo-4.png",
                        "http://cdnjson.com/images/2024/12/28/photo-15.png",
                        "http://cdnjson.com/images/2024/12/28/photo-17.png",
                        "http://cdnjson.com/images/2024/12/28/photo-5.png",
                        "http://cdnjson.com/images/2024/12/28/photo-6.png",
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
            }
            for (let i = 0; i < imgUrls.length; i++) {
                try {
                    await loadImage(imgUrls[i]);
                    allImgBoxs[i].src = imgUrls[i];
                } catch {
                }
            }
        }
    }

    LoadingOver();

}
