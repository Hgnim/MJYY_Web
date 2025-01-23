async function CheckSystemTheme() {
  let html = document.querySelector("html");
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)"); // 是深色
  if (isDarkTheme.matches) {
    //深色
    html.setAttribute("data-theme", "dark");
  } else {
    //非深色
    html.setAttribute("data-theme", "light");
  }
}

$(function () {
  CheckSystemTheme();

  if (navigator.connection != null) {
    if (navigator.connection.type === "cellular") {
      showToast("检测到当前使用计费网络，已自动切换为省流模式", 4000, "main-toast");
      SetResourceMode('low', true);
    } else {
      if (navigator.connection.effectiveType != "4g")
        showToast("检测到当前网络速度缓慢，请耐心等待", 3500, "main-toast");
    }
  }
  
  {
    const  resMode=GetResourceMode();
    loadMediaResources(resMode).then(r => {
    });
    document.getElementById("resourceModeBox_select").value = resMode;
  }

  //替换图标
  feather.replace();
});

function BodyOnLoad() {
  LoadingOver();
}
