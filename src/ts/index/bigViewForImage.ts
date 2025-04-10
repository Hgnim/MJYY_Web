import {sleep} from "@/ts/other/sleep";

const bvfi:HTMLElement=document.getElementById("bigViewForImage")!;
const bvfiib:HTMLImageElement=document.getElementById("bigViewForImage_imgBox")! as HTMLImageElement;
let imageClick_lock=false;
let bvfiClick_lock=false;
export async function imageClick(element:HTMLImageElement|null){
    if (!imageClick_lock) {
        imageClick_lock=true;
        if (element != null) {
            bvfiib.src = element.src;
            bvfi.style.display = "initial";
            await sleep(50);//等待响应
            bvfi.style.opacity = '1';
        }
        imageClick_lock=false;
    }
}
export async function bvfiClick(){
    if (!bvfiClick_lock) {
        bvfiClick_lock=true;
        bvfi.style.opacity = '0';
        await sleep(801);//等待动画完成
        bvfi.style.display = "none";
        bvfiClick_lock=false;
    }
}