import {fireMP, startGame_click} from "@/ts/defender/script";

export function startGame_Click(){
    startGame_click();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('gameStart').focus();
});

export function touchTop_click(){
    fireMP('ArrowUp');
}
export function touchBottom_click(){
    fireMP('ArrowDown');
}
export function touchLeft_click(){
    fireMP('ArrowLeft');
}
export function touchRight_click(){
    fireMP('ArrowRight');
}