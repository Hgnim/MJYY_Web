async function LoadResources() {
    {
        {
            function loadTextFile(path) {
                return new Promise((resolve, reject) => {
                    fetch(path)
                        .then((response) => response.text())
                        .then((readText) => {
                            resolve(readText);
                        })
                        .catch(()=>{
                            reject(new Error(`文本资源\'{path}\'加载失败`));
                        });
                });
            }
            const mdRes = [
                ["/md/index/serverRule.md", "ruleText"],
                ["/md/index/serverIntroductory.md", "serverIntroductoryText"],
                ["/md/index/joinUs.md", "joinUsText"],
            ];
            for (i = 0; i < mdRes.length; i++) {
                document.getElementById(mdRes[i][1]).innerHTML =
                    marked.parse(await loadTextFile(mdRes[i][0]));
            }
        }

        CheckSystemTheme();

    {
    //图片资源加载
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
      const imgUrls = [
        "http://cdnjson.com/images/2025/01/13/main2-light.png",
        "http://cdnjson.com/images/2025/01/13/main2-dark.png",
      ];
      for (i = 0; i < imgUrls.length; i++) {
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
      }
    }
    {
      const allImgBoxs = document.querySelectorAll(".photoBoxGroup-1");
      const imgUrls = [
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
      for (i = 0; i < imgUrls.length; i++){
        await loadImage(imgUrls[i]);
        allImgBoxs[i].src = imgUrls[i];
      }
    }
        }

    LoadingOver();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  LoadResources();
});
