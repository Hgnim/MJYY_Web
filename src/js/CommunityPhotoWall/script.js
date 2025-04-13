import {redirectPage} from "@/ts/global/redirect";

$(function () {
    fetch('assets/md/CommunityPhotoWall/communityPhotoWallHelp.md')
                .then(response => response.text())
                .then(markdownText => {
                    document.getElementById('help').innerHTML = marked.parse(markdownText);
                })
  });

export function gotoHomePage(){
    redirectPage('/');
}