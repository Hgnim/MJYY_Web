import {startGame_click} from "@/ts/defender/script";

export function startGame_Click(){
    startGame_click();
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('gameStart').focus();
});