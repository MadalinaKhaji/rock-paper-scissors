const Game = require("./models/game.model");
const Round = require("./models/round.model") ;

const { getComputerPick, getRoundWinner, validateGameSettings, determineGameWinner, createElement, showElement, showCurrentDate, createRestartButton, generatePickText, generateWinnerText, generateScoreText, removeChildren } = require("./util");

require("../styles.css");

let game = new Game();

let loadGame = () => {
    // show default game settings for username and  no of rounds
    document.getElementById("usernameInput").value = game.playerUsername;
    document.getElementById("noofroundsInput").value = game.roundNo;

    document.getElementById("start-button").addEventListener('click', () => {
        startGame();
    });
    document.getElementById("rock-button").addEventListener('click', function() {
        startRound("rock");
    });
    document.getElementById("paper-button").addEventListener('click', function() {
        startRound("paper");
    });
    document.getElementById("scissors-button").addEventListener('click', function() {
        startRound("scissors");
    });

    showCurrentDate("footer-date");
};

let startGame = () => {
    let usernameValue = document.getElementById("usernameInput").value;
    let noOfRoundsValue = document.getElementById("noofroundsInput").value;

    if(game.playerUsername !== usernameValue || game.roundNo !== noOfRoundsValue) {
        let validateResult = validateGameSettings(usernameValue, noOfRoundsValue);
        if(validateResult === true) {
            game.playerUsername = usernameValue.toString();
            game.roundNo = Number.parseInt(noOfRoundsValue);
            showElement("game-settings", false);
            showElement("gameplay", true);
        } else {
            let warningAlert = document.getElementById("warningAlert");
            showElement("warningAlert", false);
            showElement("warningAlert", true);
            warningAlert.innerText = validateResult;
            return 0;
        }
    }
    showElement("game-settings", false);
    showElement("gameplay", true);
};

let startRound = (userPick) => {
    if(game.rounds.length === game.roundNo) {
        showGameResults(determineGameWinner(game.playerWins, game.computerWins));
        return 0;
    }

    let newRound = new Round(userPick);
    let compPick = getComputerPick();
    let winner = getRoundWinner(newRound.userPick, compPick);

    if(winner === "user") {
        game.playerWins++;
    } else if(winner === "computer") {
        game.computerWins++;
    }

    game.rounds.push(newRound);

    showElement("results", true);
    showRoundResults(newRound.userPick, compPick, winner);
};

let showRoundResults = (userPick, compPick, roundWinner) => {
    let results = document.getElementById("results");
    
    removeChildren("results");

    let roundNoText = "Round " + game.rounds.length + " Results";
    let winnerText = generateWinnerText(roundWinner);
    let userText = generatePickText("user", userPick);
    let compText = generatePickText("computer", compPick);

    let roundNoElem = createElement("p", roundNoText);
    let winnerElem = createElement("p", winnerText);
    let userElem = createElement("p", userText);
    let compElem = createElement("p", compText);

    results.appendChild(roundNoElem);
    results.appendChild(winnerElem);
    results.appendChild(userElem);
    results.appendChild(compElem);   
};

let showGameResults = (gameWinner) => {
    let results = document.getElementById("results");
    
    removeChildren("results");

    showElement("gameplay", false);

    let winnerText = generateWinnerText(gameWinner);
    let userScoreText = generateScoreText("user", game.playerWins);
    let compScoreText = generateScoreText("computer", game.computerWins);

    let winnerElem = createElement("p", winnerText);
    let userScoreElem = createElement("p", userScoreText);
    let compScoreElem = createElement("p", compScoreText);
    let restartButtonElem = createRestartButton();

    results.appendChild(winnerElem);
    results.appendChild(userScoreElem);
    results.appendChild(compScoreElem);
    results.appendChild(restartButtonElem);

    restartButtonElem.addEventListener('click', function() {
        game.rounds = [];
        game.playerWins = 0;
        game.computerWins = 0;
        showElement("gameplay", true);
        showElement("results", false);
    });
};

loadGame();
