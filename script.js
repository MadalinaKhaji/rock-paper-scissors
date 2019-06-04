let userWins = 0;
let javascriptWins = 0;
let random = Math.random();
let javascriptPick;
let userPick;

function getRandomPick(){
    if(random < 0.33) javascriptPick = "rock";
    else if(random <0.66) javascriptPick = "paper";
    else javascriptPick = "scissors";

    console.log("Computer's pick: "+javascriptPick);
}

function startGame(pick) {
    userPick = pick;
    console.log("User's pick: "+userPick);
    getRandomPick();
    determineWinner(userPick, javascriptPick);
}

function determineWinner(userpick, jspick) {
    if(userPick === jspick) {
        document.getElementById("outcome").innerHTML = "Draw - nobody wins. Pick again!";
    } else if((userpick === "rock" && jspick === "paper") || (userpick === "scissors" && jspick === "rock") || (userPick ==="paper" && jspick === "scissors")) {
        document.getElementById("outcome").innerHTML = "Computer wins!";
        javascriptWins ++;
        printWins();
    } else {
        document.getElementById("outcome").innerHTML = "User wins!";
        userWins++;
        printWins();
    }
}

function printWins(){
    let message = "User wins: " + userWins + " vs " + "Computer wins: " + javascriptWins;
    document.getElementById("score").innerHTML = message;
}