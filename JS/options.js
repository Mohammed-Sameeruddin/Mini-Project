const index= document.querySelector(".index");
const board = document.querySelector(".board");

const compBtn = document.querySelector(".computer");
const friBtn = document.querySelector(".friend");
const xBtn = document.querySelector(".x");
const oBtn = document.querySelector(".o");
const playBtn = document.querySelector(".play");
const cvs = document.querySelector(".cvs");


const player = new Object;

let OPPONENT;

const switchActive = (off,on) => {
    off.classList.remove("active");
    on.classList.add("active");
}

xBtn.addEventListener("click",()=> {
    player.man = "X";
    player.computer = "O";
    player.friend = "O";
    switchActive(oBtn,xBtn);
});

oBtn.addEventListener("click",()=> {
    player.man = "O";
    player.computer = "X";
    player.friend = "X";
    switchActive(xBtn,oBtn);
});

compBtn.addEventListener("click",()=> {
 OPPONENT = "computer";
    switchActive(friBtn,compBtn);
});

friBtn.addEventListener("click",()=> {
 OPPONENT = "friend";
    switchActive(compBtn,friBtn);
});

playBtn.addEventListener("click",()=> {
    if(!OPPONENT){
        alert("Select Your OPPONENT");
        return;
    }
    if(!player.man){
        alert("Select Your Symbol");
        return;
    }
    index.classList.add("hide");
    board.classList.remove("hide");
});







