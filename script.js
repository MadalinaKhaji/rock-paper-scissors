// default username is User
let userName = "User";
// default no of rounds is 5
let noOfRounds = 5;

let rounds = [];

let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");

startButton.addEventListener('click', function() {
    showElement("game-settings", false);
    startGame();
});

restartButton.addEventListener('click', function() {
    showElement("restart-button", false);
    hideScores();
    rounds = [];
    startGame();
});

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
    document.getElementById("usernameInput").value = userName;
    document.getElementById("noofroundsInput").value = noOfRounds;
}

function updateGameSettings() {
    showElement("successAlert", false);
    showElement("warningAlert", false);

    let succesfulUpdate = true;

    let newUsernameValue = document.getElementById("usernameInput").value;
    let newNoOfRoundsValue = document.getElementById("noofroundsInput").value;

    let warningAlert = document.getElementById("warningAlert");
    

    if(newUsernameValue === "" || newNoOfRoundsValue === "") {
        succesfulUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter values for username and no of rounds!";
    }

    if(isNaN(newNoOfRoundsValue)) {
        succesfulUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter a number value for no of rounds!";
    }

    if(newNoOfRoundsValue <= 0) {
        succesfulUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter a positive value for no of rounds!";
    }

    if(succesfulUpdate) {
        userName = newUsernameValue.toString();
        noOfRounds = Number.parseInt(newNoOfRoundsValue);
        console.log(userName + " " + noOfRounds);
        showElement("successAlert", true);
        startButton.disabled = false;
    } else {
        startButton.disabled = true;
    }
}

function startGame() {
    showElement("gameplay", true);
    showElement("round-results", false);
    showElement("game-results", false);
}

function startRound(userPick) {
    showElement("round-results", true);

    let newRound = initializeRound(userPick);
    rounds.push(newRound);

    document.getElementById("round-results-title").innerText = "Round " + rounds.length + " Results";

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
    showElement("gameplay", false);

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
    showElement("game-results", true);
    let resultsTitle = document.getElementById("game-results-title");
    if(option === "draft") {
        resultsTitle.innerText = "Draft. Nobody Wins.";
    }
    else if(option === "Computer") {
        resultsTitle.innerText = "Game Winner is " + option.toUpperCase();
    } else if(option === "User") {
        if(userName !== "User") {
            resultsTitle.innerText = "Game Winner is " + userName.toUpperCase();
        } else {
            resultsTitle.innerText = "Game Winner is " + option.toUpperCase();
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
loadGameSettings();
