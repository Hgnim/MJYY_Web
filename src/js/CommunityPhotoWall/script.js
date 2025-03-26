$(function () {
    fetch('assets/md/CommunityPhotoWall/communityPhotoWallHelp.md')
                .then(response => response.text())
                .then(markdownText => {
                    document.getElementById('help').innerHTML = marked.parse(markdownText);
                })
  });

export function gotoHomePage(){
    //console.log(`${document.referrer} ${document.referrer.includes('/')}`)
    //判断是否有上一页且判断其是否为指定URL
    if (document.referrer && document.referrer.includes('/')) {
        //console.log(`goback`);
        //返回上一页
        window.history.back();
    } else {
        //没有上一页则直接跳转
        window.location.href = '/';
    }
}