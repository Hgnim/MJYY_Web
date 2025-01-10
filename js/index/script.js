$(function () {

  if (navigator.connection && navigator.connection.type === "cellular") {
    showToast("main-toast autocolor", "检测到当前使用计费网络，请注意流量消耗",5000);
  }
  else {
    if (navigator.connection.effectiveType!='4g')
      showToast("main-toast autocolor", "检测到当前网络速度缓慢，请耐心等待",4000);
  }
  
  //替换图标
  feather.replace();

  fetch('/md/serverRule.md')
    .then(response => response.text())
    .then(markdownText => {
      document.getElementById('ruleText').innerHTML = marked.parse(markdownText);
    })
});