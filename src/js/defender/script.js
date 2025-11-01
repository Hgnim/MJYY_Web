import {fireMP, gameOver, startGame_click} from "@/ts/defender/script";

export function startGame_Click(){
    startGame_click();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('gameStart').focus();
});

export function touchTop_click(){
    if (!gameOver)
        fireMP('ArrowUp');
}
export function touchBottom_click(){
    if (!gameOver)
        fireMP('ArrowDown');
}
export function touchLeft_click(){
    if (!gameOver)
        fireMP('ArrowLeft');
}
export function touchRight_click(){
    if (!gameOver)
        fireMP('ArrowRight');
}