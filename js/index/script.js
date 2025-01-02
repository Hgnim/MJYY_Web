$(function () {
  //替换图标
  feather.replace();

  fetch('/md/serverRule.md')
    .then(response => response.text())
    .then(markdownText => {
      document.getElementById('ruleText').innerHTML = marked.parse(markdownText);
    })
});