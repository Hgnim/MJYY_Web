import $ from 'jquery';
import {marked} from 'marked';
import {redirectPage} from "@/ts/global/redirect";

$(function () {
    fetch('assets/md/CommunityPhotoWall/communityPhotoWallHelp.md')
                .then(response => response.text())
                .then(markdownText => {
                    document.getElementById('help').innerHTML = marked.parse(markdownText).toString();
                })
  });

export function gotoHomePage(){
    redirectPage('/');
}