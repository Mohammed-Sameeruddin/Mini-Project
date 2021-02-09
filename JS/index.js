// let player1="X";
// let player2="O";

// var golbalVariableCounter = 1;

// x_list = [];
// o_list = [];

// var result=false;

// toWin = [
//     ["1","2","3"],
//     ["4","5","6"],
//     ["7","8","9"],
//     ["1","4","7"],
//     ["2","5","8"],
//     ["3","6","9"],
//     ["1","5","9"],
//     ["3","5","7"]
// ]

// function isEquals(myList1,myList2){

//     let checker = myList2.every(i => myList1.includes(i));

//     if(checker){
//         return true;
//     } else{
//         return false;
//     }
// }



// function isOver(myList,player){
//     let mywinarray = [];
//     for(var i=0;i<toWin.length;i++){
//         if(isEquals(myList,toWin[i])){
//             mywinarray = toWin[i];
//             document.getElementById("result").innerHTML="Winner :  "+player;
//             document.getElementById("turn").innerHTML="Congratulations " + player;

//             var inputs = document.getElementsByTagName("input");
//             for(var i=0;i<inputs.length;i++){
//                 if(inputs[i].value == " ") {
//                     inputs[i].value = "  ";
//                 } else if(inputs[i].value == player){
//                     if(player=="X"){
//                         for(var k=0;k<mywinarray.length;k++) {
//                             if(inputs[i].id==mywinarray[k]){
//                                 inputs[i].style.color="blue";
//                                 inputs[i].style.fontWeight="bold";
//                                 inputs[i].style.border="5px solid blue";
//                             }
//                         }
                    
//                     }else{
//                         for(var k=0;k<mywinarray.length;k++) {
//                             if(inputs[i].id==mywinarray[k]){
//                                 inputs[i].style.color="red";
//                                 inputs[i].style.fontWeight="bold";
//                                 inputs[i].style.border="5px solid red";
//                             }
//                         }
//                     }
//                 }
//             }
//             var button = document.createElement("button");
//             button.innerHTML="Play Again";
//             button.style.width="220px";
//             button.style.height="90px";
//             button.style.color="white";
//             button.style.backgroundColor="red";
//             button.style.fontSize="30px";
//             button.style.borderRadius="30px";
//             button.style.border="5px solid white";
//             var element = document.getElementById("button").appendChild(button).style.display="block";
//             result = true;
//             button.addEventListener('click',function(){
//                 location.href="index.html";
//             })
//            break;    
//         }
//     }
//     drawn();

// }

// function drawn() {
//     if(o_list.length==4 && x_list.length==5 && result==false){
//         document.getElementById("turn").innerHTML="Match Drawn";
//         var button = document.createElement("button");
//         button.innerHTML="Draw";
//         button.style.width="220px";
//         button.style.height="90px";
//         button.style.color="white";
//         button.style.backgroundColor="blue";
//         button.style.fontSize="30px";
//         button.style.fontFamily="'Dancing Script', cursive";
//         button.style.borderRadius="30px";
//         button.style.border="5px solid white";
//         var element = document.getElementById("button").appendChild(button).style.display="block";
//         result = true;
//         button.addEventListener('click',function(){
//             location.href="index.html";
//         })
//     }
// }

// const put = document.querySelector(".put");
// console.log(put);

// put.addEventListener("click",(myValue) => {
//     if(myValue.value == " ") {
//         if(golbalVariableCounter%2 == 0) {
//             document.getElementById("turn").innerHTML="Player X's turn";
//             myValue.value = "O";
//             o_list.push(myValue.id);
//             if(o_list.length >= 3){
//                 isOver(o_list,player2);
//             }
            
//         } else {
//             document.getElementById("turn").innerHTML="Player O's turn";
//             myValue.value = "X";
//             x_list.push(myValue.id);
//             if(x_list.length >= 3){
//                 isOver(x_list,player1);
//             }
//         }
        
//         golbalVariableCounter++;
        
//     }
// })

// function put(myValue) {
//     if(myValue.value == " ") {
//         if(golbalVariableCounter%2 == 0) {
//             document.getElementById("turn").innerHTML="Player X's turn";
//             myValue.value = "O";
//             o_list.push(myValue.id);
//             if(o_list.length >= 3){
//                 isOver(o_list,player2);
//             }
            
//         } else {
//             document.getElementById("turn").innerHTML="Player O's turn";
//             myValue.value = "X";
//             x_list.push(myValue.id);
//             if(x_list.length >= 3){
//                 isOver(x_list,player1);
//             }
//         }
        
//         golbalVariableCounter++;
        
//     }

// }

let winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let GAME_OVER= false;
let gameData = new Array(9);
let currentPlayer = player.man;
let manList = [];
let compList = [];


function getId(myval) {

    if(GAME_OVER) {
        return;
    }


    let id = myval.id;

    if(gameData[id]) return;

    if(!currentPlayer) currentPlayer=player.man;

    gameData[id] = currentPlayer;

    drawPlayer(currentPlayer,id);

    storeMove(currentPlayer,id);

    if(isWinner(gameData, currentPlayer)){
        showGameOver(currentPlayer);
        GAME_OVER = true;
        return;
    }

    if(isTie(gameData)){
        showGameOver("tie");
        GAME_OVER = true;
        return;
        }

    if(OPPONENT=="computer"){
        let mid = minimax( gameData, player.computer ).id;

        gameData[mid] = player.computer;

        drawPlayer(player.computer,mid);

        storeMove(player.computer,mid);

        if(isWinner(gameData, player.computer)){
            showGameOver(player.computer);
            GAME_OVER = true;
            return;
        }

        if(isTie(gameData)){
            showGameOver("tie");
            GAME_OVER = true;
            return;
        }
    }else {
        currentPlayer = currentPlayer == player.man ? player.friend : player.man;
    }
    function minimax(gameData, PLAYER){
        // BASE
        if( isWinner(gameData, player.computer) ) return { evaluation : +10 };
        if( isWinner(gameData, player.man)      ) return { evaluation : -10 };
        if( isTie(gameData)                     ) return { evaluation : 0 };
    
        // LOOK FOR EMTY SPACES
        let EMPTY_SPACES = getEmptySpaces(gameData);
    
        // SAVE ALL MOVES AND THEIR EVALUATIONS
        let moves = [];
    
        // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM
        for( let i = 0; i < EMPTY_SPACES.length; i++){
            // GET THE ID OF THE EMPTY SPACE
            let id = EMPTY_SPACES[i];
    
            // BACK UP THE SPACE
            let backup = gameData[id];
    
            // MAKE THE MOVE FOR THE PLAYER
            gameData[id] = PLAYER;
    
            // SAVE THE MOVE'S ID AND EVALUATION
            let move = {};
            move.id = id;
            // THE MOVE EVALUATION
            if( PLAYER == player.computer){
                move.evaluation = minimax(gameData, player.man).evaluation;
            }else{
                move.evaluation = minimax(gameData, player.computer).evaluation;
            }
    
            // RESTORE SPACE
            gameData[id] = backup;
    
            // SAVE MOVE TO MOVES ARRAY
            moves.push(move);
        }
    
        // MINIMAX ALGORITHM
        let bestMove;
    
        if(PLAYER == player.computer){
            // MAXIMIZER
            let bestEvaluation = -Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation > bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }else{
            // MINIMIZER
            let bestEvaluation = +Infinity;
            for(let i = 0; i < moves.length; i++){
                if( moves[i].evaluation < bestEvaluation ){
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
    
        return bestMove;
    }

}

function getEmptySpaces(gameData){
    let EMPTY = [];

    for( let id = 0; id < gameData.length; id++){
        if(!gameData[id]) EMPTY.push(id);
    }

    return EMPTY;
}

function isWinner(gameData,currentPlayer){
    
    for(let i = 0; i < winCombos.length; i++){
        let won = true;

        for(let j = 0; j < winCombos[i].length; j++){
            let id = winCombos[i][j];
            won = gameData[id] == currentPlayer && won;
        }

        if(won){
            return true;
        }
    }
    return false;
}

function showGameOver(currentPlayer) {
    let msg = currentPlayer == "tie" ? "Match " : " Winner : ";
    let result = document.getElementById("result").innerHTML = `${msg} ${currentPlayer}`;
    var button = document.createElement("button");
        button.innerHTML="Play Again";
        button.style.width="220px";
        button.style.height="90px";
        button.style.textAlign="center";
        button.style.color="white";
        button.style.backgroundColor="red";
        button.style.fontSize="30px";
        button.style.borderRadius="30px";
        button.style.border="5px solid white";
        var element = document.getElementById("button").appendChild(button).style.display="block";
        result = true;
        button.addEventListener('click',function(){
            location.href="index.html";
        });
        if(currentPlayer==player.man){
            mynewlist = [];
            for(let i=0;i<manList.length;i++){
                mynewlist.push(parseInt(manList[i]));
            }
            for(let i=0;i<winCombos.length;i++){
            let checker = (myList1, myList2) => myList2.every(v => myList1.includes(v));
            if(checker(mynewlist,winCombos[i])){
                for(let j=0;j<winCombos[i].length;j++){
                    let x = document.getElementById(winCombos[i][j]);
                    if(currentPlayer=="X"){
                    x.style.color="white";
                    x.style.fontWeight="bold";
                    x.style.border="5px solid white";
                    x.style.backgroundColor="blue";
                    } else if(currentPlayer =="O"){
                        x.style.color="white";
                        x.style.fontWeight="bold";
                        x.style.border="5px solid white";
                        x.style.backgroundColor="red";
                    }
                }
            }
        }
    } else if (currentPlayer == player.computer) {
        mynewlist = [];
        for(let i=0;i<compList.length;i++){
            mynewlist.push(parseInt(compList[i]));
        }
        for(let i=0;i<winCombos.length;i++){
            let checker = (myList1, myList2) => myList2.every(v => myList1.includes(v));
            if(checker(mynewlist,winCombos[i])){
                for(let j=0;j<winCombos[i].length;j++){
                    let x = document.getElementById(winCombos[i][j]);
                    if(currentPlayer=="O") {
                    x.style.color="white";
                    x.style.fontWeight="bold";
                    x.style.border="5px solid white";
                    x.style.backgroundColor="red";
                    } else if (currentPlayer=="X"){
                        x.style.color="white";
                        x.style.fontWeight="bold";
                        x.style.border="5px solid white";
                        x.style.backgroundColor="blue";
                    }
                }
            }
        }

    } else if(currentPlayer=="tie") {
        let inputs = document.getElementsByTagName("input");
        for(let i=0;i<inputs.length;i++){
            inputs[i].style.color="brown";
            inputs[i].style.border="5px solid darkred";
            inputs[i].style.fontWeight="bold";
        }
    }
    
}
function isTie(gameData){
    let isBoardFill = true;
    for(let i = 0; i < gameData.length; i++){
        isBoardFill = gameData[i] && isBoardFill;
    }
    if(isBoardFill){
        return true;
    }
    return false;
}

function drawPlayer(currentPlayer,id){
    let x = document.getElementById(id);
    if(!x) return;
    x.value = currentPlayer;
}

function storeMove(currentPlayer,id){
    if(currentPlayer==player.man){
        manList.push(id);
    }
    else if (currentPlayer==player.computer){
        compList.push(id);
    }
}

function printMove(list1,list2){
    for(var i=0;i<list1.length;i++){
        console.log(list1[i]);
    }
    for(var i=0;i<list2.length;i++){
        console.log(list2[i]);
    }
}

function isEquals(myList1,myList2){

    let checker = (myList1, myList2) => myList2.every(v => myList1.includes(v));

    if(checker(myList1,myList2)){
        return true;
    } else {
        return false;
    }
}














