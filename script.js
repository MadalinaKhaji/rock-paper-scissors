let userWins = 0;
let computerWins = 0;

function getComputerPick(){
    let random = Math.random();
    let computerPick = "";
    if(random < 0.33) computerPick = "rock";
    else if(random < 0.66) computerPick = "paper";
    else computerPick = "scissors";
    return computerPick;
}

function startGame(userPick) {
    let computerPick = getComputerPick();
    displayPicks(userPick, computerPick);
    let winner = determineWinner(userPick, computerPick);
    if(winner === "user") {
        userWins++;
    } else if(winner === "computer") {
        computerWins ++;
    }
    displayWinner(winner);
}

function determineWinner(pick1, pick2) {
    if(pick1 === pick2) return "draft";
    else if((pick1 === "rock" && pick2 === "paper") || (pick1 === "scissors" && pick2 === "rock") || (pick1 ==="paper" && pick2 === "scissors")) {
        return "computer";
    } else {
        return "user";
    }
}

function displayWinner(option) {
    let elem = document.getElementById("round-winner");
    if(option === "draft") elem.innerHTML = "Draw. Nobody wins!";
    else if(option === "user") elem.innerHTML = "Winner is: User!";
    else if(option === "computer") elem.innerHTML = "Winner is: Computer!";
    displayScores();
}

function displayScores() {
    let userScore = document.getElementById("user-score");
    let computerScore = document.getElementById("computer-score");
    userScore.innerHTML = userWins;
    computerScore.innerHTML = computerWins;
}

function displayPicks(uPick, cPick) {
    document.getElementById("picks").innerHTML = "User: " + uPick + " | " + "Computer: " + cPick;
}

function displayDate() {
    let currentDate = new Date();
    currentDate = currentDate.getFullYear();
    document.getElementById("footer-date").innerHTML = currentDate;
}

displayDate();