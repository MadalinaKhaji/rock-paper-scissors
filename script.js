// default username is User
let userName = "User";
let rounds = [];
// default no of rounds is 10
let noOfRounds = 10;

let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");

startButton.addEventListener('click', function() {
    showElement("settings-card", false);
    startGame();
});

restartButton.addEventListener('click', function() {
    showElement("restart-button", false);
    hideScores();
    rounds = [];
    startGame();
});

function setUserName(newUserName) {
    userName = newUserName;
}

function setNoOfRounds(newNoOfRounds) {
    noOfRounds = newNoOfRounds;
}

function getComputerPick(){
    let random = Math.random();
    let computerPick = "";
    if(random < 0.33) {
        computerPick = "rock";
    } else if(random < 0.66) {
        computerPick = "paper";
    } else {
        computerPick = "scissors";
    }
    return computerPick;
}

function initializeRound(userPick) {
    let uPick = userPick;
    let cPick = getComputerPick();
    let rWinner = determineRoundWinner(uPick, cPick);
    let round = {
        userPick: uPick,
        computerPick: cPick,
        roundWinner: rWinner
    };
    return round;
}

function loadGameSettings() {
    document.getElementById("user-name").innerText = "Username: " + userName;
    document.getElementById("no-rounds").innerText = "No of rounds: " + noOfRounds;
}

function startGame() {
    showElement("results-card", false);
    showElement("gameplay-card", true);
}

function startRound(userPick) {
    let newRound = initializeRound(userPick);
    rounds.push(newRound);

    showElement("results-card", true);

    document.getElementById("results-card-title").innerText = "Round " + rounds.length + " Results";

    showRoundWinner(newRound.roundWinner);
    showPicks(newRound.userPick, newRound.computerPick);
    
    if((rounds.length - 1) === noOfRounds) {
        determineGameWinner();
    }
}

function determineRoundWinner(pick1, pick2) {
    if(pick1 === pick2) {
        return "draft";
    } else if((pick1 === "rock" && pick2 === "paper") || (pick1 === "scissors" && pick2 === "rock") || (pick1 ==="paper" && pick2 === "scissors")) {
        return "computer";
    } else {
        return "user";
    }
}

function determineGameWinner() {
    showElement("gameplay-card", false);

    let userWins = 0;
    let computerWins = 0;

    for(let i = 0; i < rounds.length; i++) {
        if(rounds[i].roundWinner === "user") {
            userWins++;
        } else if(rounds[i].roundWinner === "computer") {
            computerWins++;
        }
    }

    showScores(userWins, computerWins);

    if(userWins > computerWins) {
        showGameWinner("User");
    } else if(userWins < computerWins) {
        showGameWinner("Computer");
    } else {
        showGameWinner("draft");
    }
}

function showGameWinner(option) {
    let resultsTitle = document.getElementById("results-card-title");
    if(option === "draft") {
        resultsTitle.innerText = "Game ends with draft.";
    }
    else if(option === "Computer") {
        resultsTitle.innerText = "Winner of the game is: " + option.toUpperCase();
    } else if(option === "User") {
        if(userName !== "User") {
            resultsTitle.innerText = "Winner of the game is: " + userName.toUpperCase();
        } else {
            resultsTitle.innerText = "Winner of the game is: " + option.toUpperCase();
        }
    }
    hideRoundWinner();
    hidePicks();
    showElement("restart-button", true);
}

function showRoundWinner(option) {
    let elem = document.getElementById("round-winner");
    elem.style.display = "block";
    if(option === "draft") {
        elem.innerText = "Draw. Nobody wins!";
    } else if(option === "user") {
        if(userName !== "User") {
            elem.innerText = "Winner is: " + userName;
        } else {
            elem.innerText = "Winner is: User";
        }
    } else if(option === "computer") {
        elem.innerText = "Winner is: Computer";
    }
}

function hideRoundWinner() {
    let elem = document.getElementById("round-winner");
    elem.style.display = "none";
}

function showElement(elemId, canShow) {
    let elem = document.getElementById(elemId);
    if(canShow === true) {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

function showScores(uScore, cScore) {
    let userScore = document.getElementById("user-score");
    let computerScore = document.getElementById("computer-score");
    userScore.style.display = "block";
    if(userName !== "User") {
        userScore.innerText = userName + "'s Score: " + uScore;
    } else {
        userScore.innerText = "User Score: " + uScore;
    }
    computerScore.style.display = "block";
    computerScore.innerText = "Computer Score: " + cScore;
}

function hideScores() {
    let userScore = document.getElementById("user-score");
    let computerScore = document.getElementById("computer-score");
    userScore.style.display = "none";
    computerScore.style.display = "none";
}

function showPicks(uPick, cPick) {
    let userPick = document.getElementById("user-pick");
    userPick.style.display = "block";
    if(userName !== "User") {
        userPick.innerText = userName + ": " + uPick.toUpperCase();
    } else {
        userPick.innerText = "User: " + uPick.toUpperCase();
    }
    let computerPick = document.getElementById("computer-pick");
    computerPick.style.display = "block";
    computerPick.innerText = "Computer: " + cPick.toUpperCase();
}

function hidePicks() {
    let userPick = document.getElementById("user-pick");
    userPick.style.display = "none";
    let computerPick = document.getElementById("computer-pick");
    computerPick.style.display = "none";
}

function showCurrentDate() {
    let currentDate = new Date().toDateString();
    document.getElementById("footer-date").innerText = currentDate;
}

showCurrentDate();
setUserName("Sam");
setNoOfRounds(3);
loadGameSettings();