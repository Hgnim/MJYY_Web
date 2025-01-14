$(function () {
    //替换图标
    feather.replace();

    fetch('/md/CommunityPhotoWall/communityPhotoWallHelp.md')
                .then(response => response.text())
                .then(markdownText => {
                    document.getElementById('help').innerHTML = marked.parse(markdownText);
                })
  });