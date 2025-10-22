import {sleep} from "@/ts/global/sleep";

let joinUsHeaderLogoImg_clickNum:number=0;
let joinUsHeaderLogoImg_clickNum_Clock_Lock:boolean=false;
async function joinUsHeaderLogoImg_clickNum_Clock(){
    let oldNum = joinUsHeaderLogoImg_clickNum;
    while (joinUsHeaderLogoImg_clickNum!=0){
        await sleep(1000);
        if (oldNum<joinUsHeaderLogoImg_clickNum){
            joinUsHeaderLogoImg_clickNum=0;
        }
        oldNum = joinUsHeaderLogoImg_clickNum;
    }
    joinUsHeaderLogoImg_clickNum_Clock_Lock=false;
}
function joinUsHeaderLogoImg_clickNum_Add(){
    joinUsHeaderLogoImg_clickNum++;
    if (!joinUsHeaderLogoImg_clickNum_Clock_Lock){
        joinUsHeaderLogoImg_clickNum_Clock_Lock=true;
        joinUsHeaderLogoImg_clickNum_Clock();
    }
}
let joinUsHeaderLogoImg_status:number=0;
export function joinUsHeaderLogoImg_Click(){
    const juhli=document.getElementById("join_us_header_logo-img");
    if (juhli) {
        if(joinUsHeaderLogoImg_status==0) {
            function juhliAnimOver() {
                if (juhli) {
                    juhli.style.animation = '';
                    juhli.removeEventListener('animationend', juhliAnimOver);
                }
            }

            juhli.addEventListener('animationend', juhliAnimOver);//监听动画结束后移除
            juhli.style.animation = 'join_us_header_logo-img_click 200ms';
            joinUsHeaderLogoImg_clickNum_Add();
            if (joinUsHeaderLogoImg_clickNum == 3) {
                juhli.removeEventListener('animationend', juhliAnimOver);
                juhli.style.animation = 'join_us_header_logo-img_big 300ms forwards';
                joinUsHeaderLogoImg_status = 1;
            }
        }
        else if (joinUsHeaderLogoImg_status==1){
            juhli.style.animation = 'join_us_header_logo-img_big-restore 300ms forwards';
            joinUsHeaderLogoImg_status = 0;
        }
    }
}