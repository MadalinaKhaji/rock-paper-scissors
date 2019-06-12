exports.getComputerPick = () => {
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
};

exports.getRoundWinner = (upick, cpick) => {
    if (upick === cpick) {
        return "draft";
    }
    else if ((upick === "rock" && cpick === "paper") || (upick === "scissors" && cpick === "rock") || (upick === "paper" && cpick === "scissors")) {
        return "computer";
    }
    else {
        return "user";
    }
};

exports.validateGameSettings = (username, roundNo) => {
    if(username === "" || roundNo === "") {
        return "Please enter values for username and no of rounds!";
    }
    if(isNaN(roundNo)) {
        return "Please enter a number value for no of rounds!";
    }
    if(roundNo <= 0) {
        return "Please enter a positive value for no of rounds!";
    }
    return true;
};

exports.determineGameWinner = (playerWins, computerWins) => {
    if(playerWins > computerWins) {
        return "user";
    } else if(playerWins < computerWins) {
        return "computer";
    } else {
        return "draft";
    }
};

exports.generatePickText = (picker, pick) => {
    return `${picker} chose ${pick}`;
};

exports.generateScoreText = (player, score) => {
    return `${player} score is ${score}`;
};

exports.generateWinnerText = (winner) => {
    if(winner === 'draft') {
        return 'Draft. Nobody wins';
    }
    else {
        return `Winner is ${winner}`;
    }
};

exports.createElement = (type, text) => {
    let element = document.createElement(type);
    element.innerText = text;
    return element;
};

exports.showElement = (elemId, canShow) => {
    let elem = document.getElementById(elemId);
    if(canShow === true) {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
};

exports.showCurrentDate = (elemId) => {
    let currentDate = new Date().toDateString();
    document.getElementById(elemId).innerText = currentDate;
};

exports.createRestartButton = () => {
    let restartButton = document.createElement("button");
    restartButton.classList.add("btn","btn-success");
    restartButton.innerHTML = "<i class='fas fa-redo-alt'></i> Restart Game";
    return restartButton;
};

exports.removeChildren = (elemId) => {
    let elem = document.getElementById(elemId);

    while(elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
};
