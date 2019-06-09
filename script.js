class Game {
    constructor(playerUsername = "User", roundNo = 5){
        this.playerUsername = playerUsername, 
        this.roundNo = roundNo,
        this.rounds = [];
        this.playerWins = 0,
        this.computerWins = 0
    }
}

class Round {
    constructor(userPick) {
        this.userPick = userPick;
    }
    getComputerPick() {
        let random = Math.random();
        if (random < 0.33) {
            return "rock";
        }
        else if (random < 0.66) {
            return "paper";
        }
        else {
            return "scissors";
        }
    }
    getRoundWinner(upick, cpick) {
        if (upick === cpick) {
            return "draft";
        }
        else if ((upick === "rock" && cpick === "paper") || (upick === "scissors" && cpick === "rock") || (upick === "paper" && cpick === "scissors")) {
            return "computer";
        }
        else {
            return "user";
        }
    }
}

let game = new Game();

let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");

startButton.addEventListener('click', function() {
    let usernameValue = document.getElementById("usernameInput").value;
    let noOfRoundsValue = document.getElementById("noofroundsInput").value;

    if(game.playerUsername !== usernameValue || game.roundNo !== noOfRoundsValue) {
        if(validateGameSettings(usernameValue, noOfRoundsValue)) {
            game.playerUsername = usernameValue.toString();
            game.roundNo = Number.parseInt(noOfRoundsValue);
    
            showElement("game-settings", false);
            showElement("gameplay", true);
        } else {
            return 0;
        }
    }
    showElement("game-settings", false);
    showElement("gameplay", true);
});

restartButton.addEventListener('click', function() {
    showElement("game-results-title", false);
    showElement("user-score", false);
    showElement("computer-score", false);
    showElement("restart-button", false);
    showElement("results", false);
    game.rounds = [];
    game.playerWins = 0;
    game.computerWins = 0;
    showElement("gameplay", true);
});

function loadGameSettings() {
    document.getElementById("usernameInput").value = game.playerUsername;
    document.getElementById("noofroundsInput").value = game.roundNo;
}

function validateGameSettings(username, roundNo) {
    let canUpdate = true;
    let warningAlert = document.getElementById("warningAlert");

    showElement("warningAlert", false);

    if(username === "" || roundNo === "") {
        canUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter values for username and no of rounds!";
    }
    if(isNaN(roundNo)) {
        canUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter a number value for no of rounds!";
    }
    if(roundNo <= 0) {
        canUpdate = false;
        showElement("warningAlert", true);
        warningAlert.innerText = "Please enter a positive value for no of rounds!";
    }
    return canUpdate;
}

function startRound(userPick) {
    if(game.rounds.length === game.roundNo) {
        determineGameWinner();
        return 0;
    }

    let newRound = new Round(userPick);
    let compPick = newRound.getComputerPick();
    let winner = newRound.getRoundWinner(newRound.userPick, compPick);

    if(winner === "user") {
        game.playerWins++;
    } else if(winner === "computer") {
        game.computerWins++;
    }

    game.rounds.push(newRound);
    
    showWinner(winner, "round");
    showPicks(newRound.userPick, compPick);
}

function determineGameWinner() {
    if(game.playerWins > game.computerWins) {
        showWinner("user", "game");
    } else if(game.playerWins < game.computerWins) {
        showWinner("computer", "game");
    } else {
        showWinner("draft", "game");
    }
}

function showWinner(winner, option){
    let elem;

    showElement("results", true);

    if(option === "game") {
        elem = document.getElementById("game-results-title");
        showElement("gameplay", false);
        showElement("game-results-title", true);
        showElement("round-results-title", false);
        showElement("round-winner", false);
        showElement("user-pick", false);
        showElement("computer-pick", false);
        showElement("user-score", true);
        showElement("computer-score", true);
        showScores(game.playerWins, game.computerWins);
        showElement("restart-button", true);
    }
    if(option === "round") {
        elem = document.getElementById("round-winner");
        showElement("game-results-title", false);
        showElement("round-results-title", true);
        showElement("round-winner", true);
        showElement("user-pick", true);
        showElement("computer-pick", true);
        showElement("user-score", false);
        showElement("computer-score", false);
        showElement("restart-button", false);
        let resultsTitle = document.getElementById("round-results-title");
        resultsTitle.innerText = "Round " + game.rounds.length + " Results";
    }
    if(winner === "draft") {
        elem.innerText = "Draft";
    } else if(winner === "computer") {
        elem.innerText = "Winner is " + winner.toUpperCase();
    } else if(winner === "user") {
        if(game.playerUsername !== "User") {
            elem.innerText = "Winner is " + game.playerUsername.toUpperCase();
        } else {
            elem.innerText = "Winner is " + winner.toUpperCase();
        }
    }
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
    if(game.playerUsername !== "User") {
        userScore.innerText = game.playerUsername + "'s Score: " + uScore;
    } else {
        userScore.innerText = "User Score: " + uScore;
    }
    computerScore.innerText = "Computer Score: " + cScore;
}

function showPicks(uPick, cPick) {
    let userPick = document.getElementById("user-pick");
    let computerPick = document.getElementById("computer-pick");
    if(game.playerUsername !== "User") {
        userPick.innerText = game.playerUsername + " chose " + uPick.toUpperCase();
    } else {
        userPick.innerText = "User chose " + uPick.toUpperCase();
    }
    computerPick.innerText = "Computer chose " + cPick.toUpperCase();
}

function showCurrentDate() {
    let currentDate = new Date().toDateString();
    document.getElementById("footer-date").innerText = currentDate;
}

loadGameSettings();
showCurrentDate();
