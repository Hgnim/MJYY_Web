import {sleep} from "@/ts/global/sleep";

window.addEventListener('keydown', (e: KeyboardEvent) => {
    switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            e.preventDefault();//防止触发滚动等
            fireMP(e.key);
            break;
    }
});
//判断是否碰撞（精度范围：矩形）
function isCollide(a:DOMRect, b:DOMRect) {
    return !(
        a.right  < b.left   ||
        a.left   > b.right  ||
        a.bottom < b.top    ||
        a.top    > b.bottom
    );
}
//进行碰撞检查
function doCollideCheck(dataLoc:number[]): boolean {
    const a=allLoc[0][dataLoc[1]];
    const b=allLoc[1][dataLoc[1]];
    if (a!=null && b!=null){
        if (isCollide(a,b)){
            allLoc[0][dataLoc[1]]=null;
            allLoc[1][dataLoc[1]]=null;
            return false;
        }
        else
            return true;
    }
    else{
        return true;//false;
    }
}
const mpSpeed=2;
const player=document.getElementById("player");
function fireMP(key:string){
    if (player) {
        switch (key) {
            case 'ArrowUp':
                mjyyProjectile_Move(player.offsetTop-player.offsetHeight+24,
                    player.offsetLeft-player.offsetWidth+24,
                    -mpSpeed,0,
                    ++cumulativeSequence[0][0],[0,0]);
                break;
            case 'ArrowDown':
                mjyyProjectile_Move(player.offsetTop+24,
                    player.offsetLeft+24,
                    mpSpeed,0,
                    ++cumulativeSequence[0][1],[0,1]);
                break;
            case 'ArrowLeft':
                mjyyProjectile_Move(player.offsetTop+24,
                    player.offsetLeft-player.offsetWidth+24,
                    0,-mpSpeed,
                    ++cumulativeSequence[0][2],[0,2]);
                break;
            case 'ArrowRight':
                mjyyProjectile_Move(player.offsetTop-player.offsetHeight+24,
                    player.offsetLeft+24,
                    0,mpSpeed,
                    ++cumulativeSequence[0][3],[0,3]);
                break;
        }
    }
}
let nowSequence:number[][]=[[0,0,0,0],[0,0,0,0]];//当前序列
let cumulativeSequence:number[][]=[[-1,-1,-1,-1],[-1,-1,-1,-1]];//累计序列
const allLoc:(DOMRect|null)[][]=[//所有碰撞待检测对象的坐标
    [new DOMRect(),new DOMRect(),new DOMRect(),new DOMRect()],
    [new DOMRect(),new DOMRect(),new DOMRect(),new DOMRect()]
];
async function objMove(
    obj:HTMLImageElement,
    top:number, left:number,
    sequence:number,dataLoc:number[],
    topType:number=0,leftType:number=0
){
    allLoc[dataLoc[0]][dataLoc[1]]=obj.getBoundingClientRect();//开始先初始化一次，避免后续碰撞判断直接判定为null
    while (
        !(//xxxType=0表示高值低值都可超过，1表示只允许超过低值，2表示只允许超过高值
            (
                (obj.offsetTop>window.innerHeight && (topType==0||topType==1)) ||
                (obj.offsetTop<-obj.height && (topType==0||topType==2))
            ) ||
            (
                (obj.offsetLeft>window.innerWidth && (leftType==0||leftType==1)) ||
                (obj.offsetLeft<-obj.width && (leftType==0||leftType==2))
            )
        )
        ){
        if (sequence==nowSequence[dataLoc[0]][dataLoc[1]]){
            if (!doCollideCheck(dataLoc))
                break;
            console.log(nowSequence);
            allLoc[dataLoc[0]][dataLoc[1]]=obj.getBoundingClientRect();
            if (dataLoc[0]==1 && player){
                if (isCollide(obj.getBoundingClientRect(),player.getBoundingClientRect())){
                    document.getElementById('gameOver')!.style.visibility='visible';
                }
            }
        }
        obj.style.top=`${obj.offsetTop+top}px`;
        obj.style.left=`${obj.offsetLeft+left}px`;
        await sleep(10);
    }
    nowSequence[dataLoc[0]][dataLoc[1]]++;
}
async function mjyyProjectile_Move(
    initTop:number, initLeft:number,
    top:number, left:number,
    seq:number,seqLoc:number[]
) {
    const mp:HTMLImageElement=document.createElement('img');
    mp.style.top = initTop+'px';
    mp.style.left = initLeft+'px';
    mp.src = "https://s21.ax1x.com/2024/12/28/pAxP0P0.png";
    mp.className="mjyy-projectile";
    document.body.appendChild(mp);
    await objMove(mp, top, left,seq,seqLoc);
    mp.remove();
}
const fcSpeed=2;
const fcSpawnInterval=800;
async function fireCharge_Spawn(){
    while (!player){//等待元素加载
       await sleep(100);
    }
    while (true) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:

                fireCharge_Move(-24,
                    player.offsetLeft - player.offsetWidth + 24,
                    fcSpeed, 0,
                    1,0,
                    ++cumulativeSequence[1][0],[1,0]);
                break;
            case 1:
                fireCharge_Move(window.innerHeight,
                    player.offsetLeft+24,
                    -fcSpeed, 0,
                    2,0,
                    ++cumulativeSequence[1][1],[1,1]);
                break;
            case 2:
                fireCharge_Move(player.offsetTop + 24,
                    -24,
                    0, fcSpeed,
                    0,1,
                    ++cumulativeSequence[1][2],[1,2]);
                break;
            case 3:
                fireCharge_Move(player.offsetTop - player.offsetHeight + 24,
                    window.innerWidth,
                    0, -fcSpeed,
                    0,2,
                    ++cumulativeSequence[1][3],[1,3]);
                break;
        }
        await sleep(fcSpawnInterval);
    }
}
async function fireCharge_Move(
    initTop:number, initLeft:number,
    top:number, left:number,
    topt:number,leftt:number,
    seq:number,seqLoc:number[]
){
    const fc:HTMLImageElement=document.createElement('img');
    fc.style.top = initTop+'px';
    fc.style.left = initLeft+'px';
    fc.src = "https://s21.ax1x.com/2025/10/30/pVzCjtH.png";
    fc.className="fire-charge";
    document.body.appendChild(fc);
    await objMove(fc, top, left,seq,seqLoc,topt,leftt);
    fc.remove();
}

document.addEventListener('DOMContentLoaded', function () {
    fireCharge_Spawn();
});