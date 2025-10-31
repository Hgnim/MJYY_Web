import {sleep} from "@/ts/global/sleep";
import {redirectPage} from "@/ts/global/redirect";

window.onload=function(){
    const gl=document.getElementById('gameLoading')!;
    gl.style.display="none";
    isLoaded=true;
}
let isLoaded = false;
let gameStarted = false;
export function startGame_click(){
    if (!gameStarted && isLoaded) {
        gameStarted = true;
        document.getElementById('gameStart')!.style.display = 'none';
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
        fireCharge_Spawn();
    }
}


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
const player:HTMLElement|null=document.getElementById("player");
const player_red:HTMLImageElement|null=document.querySelector("#player .red") as HTMLImageElement;
let lastKey:string='null';
function fireMP(key:string){
    if (player) {
        if (canShootFire) {
            switch (key) {
                case 'ArrowUp': {
                    async function doIt(wait: number = 0) {
                        if (wait > 0) await sleep(wait);
                        if (player) {
                            await mjyyProjectile_Move(player.offsetTop - player.offsetHeight + 24 + 12,
                                player.offsetLeft - player.offsetWidth + 24,
                                -mpSpeed, 0,
                                ++cumulativeSequence[0][0], [0, 0]);
                        }
                    }

                    if (lastKey == 'ArrowUp') {
                        player_doAnim("player-top-shoot .25s forwards");
                        doIt();
                    } else {
                        player_doAnim("player-top .5s forwards");
                        lastKey = 'ArrowUp';
                        doIt(250);
                    }
                }
                    break;
                case 'ArrowDown': {
                    async function doIt(wait: number = 0) {
                        if (wait > 0) await sleep(wait);
                        if (player) {
                            mjyyProjectile_Move(player.offsetTop + 24 - 12,
                                player.offsetLeft + 24 - 12,
                                mpSpeed, 0,
                                ++cumulativeSequence[0][1], [0, 1]);
                        }
                    }

                    if (lastKey == 'ArrowDown') {
                        player_doAnim("player-bottom-shoot .25s forwards");
                        doIt();
                    } else {
                        player_doAnim("player-bottom .5s forwards");
                        lastKey = 'ArrowDown';
                        doIt(250);
                    }
                }
                    break;
                case 'ArrowLeft': {
                    async function doIt(wait: number = 0) {
                        if (wait > 0) await sleep(wait);
                        if (player) {
                            mjyyProjectile_Move(player.offsetTop + 24 - 12,
                                player.offsetLeft - player.offsetWidth + 24,
                                0, -mpSpeed,
                                ++cumulativeSequence[0][2], [0, 2]);
                        }
                    }

                    if (lastKey == 'ArrowLeft') {
                        player_doAnim("player-left-shoot .25s forwards");
                        doIt();
                    } else {
                        player_doAnim("player-left .5s forwards");
                        lastKey = 'ArrowLeft';
                        doIt(250);
                    }
                }
                    break;
                case 'ArrowRight': {
                    async function doIt(wait: number = 0) {
                        if (wait > 0) await sleep(wait);
                        if (player) {
                            mjyyProjectile_Move(player.offsetTop - player.offsetHeight + 24,
                                player.offsetLeft + 24 - 12,
                                0, mpSpeed,
                                ++cumulativeSequence[0][3], [0, 3]);
                        }
                    }

                    if (lastKey == 'ArrowRight') {
                        player_doAnim("player-right-shoot .25s forwards");
                        doIt();
                    } else {
                        player_doAnim("player-right .5s forwards");
                        lastKey = 'ArrowRight';
                        doIt(250);
                    }
                }
                    break;
                default:
                    return;
            }
            shootHot();
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
            //console.log(nowSequence);
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
                    player.offsetLeft+24-12,
                    -fcSpeed, 0,
                    2,0,
                    ++cumulativeSequence[1][1],[1,1]);
                break;
            case 2:
                fireCharge_Move(player.offsetTop + 24-12,
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
});
let isAnimating:boolean=false;
let lastAnim:string = 'null';
function player_doAnim(anim:string){
    function freeze(){
        if (player) {
            const tra = getComputedStyle(player).transform;
            player.style.transform = tra === 'none' ? 'unset' : tra;
        }
    }
    if (player) {
        if (isAnimating) {
            player.style.animationPlayState = 'paused';
            freeze();
        } else {
            player.addEventListener('animationend', function () {
                //监听动画结束，动画结束后将当前状态固化
                freeze();
                isAnimating = false;
            }, {once: true/*只执行一次监听*/});
        }
        if (lastAnim==anim) {
            player.style.animation = 'unset';
            void player.offsetWidth;//强制回流，强制让浏览器将上行更改应用
        }
        isAnimating = true;
        player.style.animation = anim;
        lastAnim=anim;
    }
}

let canShootFire:boolean=true;
let shootHotValue:number=0;//枪管热度值
function shootHotValue_change(v:number,changeShow:boolean=true){
    shootHotValue+=v;
    if (shootHotValue<0)
        shootHotValue=0;
    if (changeShow) shootHotValue_changeShow();
}
//将枪管热度表现出来
function shootHotValue_changeShow(){
    if (player_red){
        player_red.style.opacity=(shootHotValue/shootHotMax).toString();
    }
}
const shootHotMax:number = 80;//枪管热度极限值
//枪管过热计算
function shootHot(){
    if (shootHotValue++<=0){
        console.log('shootCooling Run');
        shootCooling();
    }
    shootHotValue_changeShow();
}
const coolingSpeed:number = 1;//冷却速度
const coolingInterval:number=10;//冷却速度间隙
const coolingByStopshoot:number=1000;//停火多久后开始冷却
const coolingFlushTime:number = 10;//冷却计算刷新时间
//枪管冷却计算
async function shootCooling(){
    let lastshootHotV:number=shootHotValue;//记忆上次的枪管热度，用于判断当前是否继续在开枪
    let stopshootV:number=0;//停火时间值
    while (shootHotValue>0){
        if (shootHotValue>=shootHotMax && canShootFire){
            canShootFire=false;
        }
        if (stopshootV>=coolingByStopshoot || !canShootFire){
            console.log('cooling now');
            const flashMax:number=10;//闪烁等待步进
            let flashNow:number=0;
            let cantShootWait_nowV:number = 0;//如果是无法射击，则等待停火一段时间后再进行恢复
            do {
                if (canShootFire || cantShootWait_nowV>=coolingByStopshoot) {
                    if (canShootFire) {
                        shootHotValue_change(-coolingSpeed);
                        void player_red!.offsetWidth;
                    }else{
                        shootHotValue_change(-coolingSpeed,false);
                        if (flashNow==Math.round(flashMax/3)){
                            shootHotValue_changeShow();
                            void player_red!.offsetWidth;
                        }
                    }
                }else{
                    cantShootWait_nowV+=coolingInterval;
                    if (flashNow==Math.round(flashMax/3) && player_red) {
                        player_red.style.opacity='1';
                        void player_red.offsetWidth;
                    }
                }
                lastshootHotV=shootHotValue;
                if (!canShootFire){
                    if(flashNow++>=flashMax){
                        if (player_red){
                            player_red.style.opacity=(Number(player_red.style.opacity)/2).toString();
                            void player_red.offsetWidth;
                        }
                        flashNow=0;
                    }
                }
                await sleep(coolingInterval);
            }while (lastshootHotV==shootHotValue && !(shootHotValue<=0))
            stopshootV=0;
        }
        if (lastshootHotV==shootHotValue){
            stopshootV+=coolingFlushTime;
            //console.log(stopshootV);
        }else{
            stopshootV=0;
            lastshootHotV=shootHotValue;
        }
        await sleep(coolingFlushTime);
    }
    if (!canShootFire) canShootFire=true;//超出最大值后需等待完全冷却后才可继续设计
}