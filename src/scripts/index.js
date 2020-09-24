const Game = require('./models/game.model');
const Round = require('./models/round.model');

const {
  getComputerPick,
  getRoundWinner,
  determineGameWinner,
  createElement,
  showElement,
  createRestartButton,
  generatePickText,
  generateWinnerText,
  generateScoreText,
  removeChildren,
} = require('./util');

require('../styles.css');

let game = new Game();

let loadGame = () => {
  document.getElementById('start-button').addEventListener('click', () => {
    startGame();
  });
  document.getElementById('rock-button').addEventListener('click', function () {
    startRound('rock');
  });
  document.getElementById('paper-button').addEventListener('click', function () {
    startRound('paper');
  });
  document.getElementById('scissors-button').addEventListener('click', function () {
    startRound('scissors');
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    next();
  });
};

let startGame = () => {
  let noOfRoundsValue = document.getElementById('noofroundsInput').value;
  // assign default of 3 rounds
  if (noOfRoundsValue === 'Choose...') {
    game.roundNo = 3;
  } else {
    game.roundNo = +noOfRoundsValue;
  }

  showElement('game-settings', false);
  showElement('gameplay', true);
};

let startRound = (userPick) => {
  if (game.rounds.length === game.roundNo) {
    showGameResults(determineGameWinner(game.playerWins, game.computerWins));
    return 0;
  }

  let newRound = new Round(userPick);
  let compPick = getComputerPick();
  let winner = getRoundWinner(newRound.userPick, compPick);

  if (winner === 'user') {
    game.playerWins++;
  } else if (winner === 'computer') {
    game.computerWins++;
  }

  game.rounds.push(newRound);
  showElement('gameplay', false);
  showElement('results', true);
  showRoundResults(newRound.userPick, compPick, winner);
};

let showRoundResults = (userPick, compPick, roundWinner) => {
  let results = document.getElementById('roundResults');

  removeChildren('roundResults');

  // let roundNoText = 'Round ' + game.rounds.length + ' Results';
  let winnerText = generateWinnerText(roundWinner);
  let userText = generatePickText('You', userPick);
  let compText = generatePickText('Computer', compPick);

  // let roundNoElem = createElement('p', roundNoText);
  let winnerElem = createElement('h3', winnerText);
  let userElem = createElement('p', userText);
  let compElem = createElement('p', compText);

  // let countdownDisplay = "<div class='countdownDisplay'><span id='countdownText'>3</span> SEC </div><button class='btn btn-primary' id='nextBtn' onclick='alert();'>Next</button>";

  // results.appendChild(roundNoElem);
  results.appendChild(winnerElem);
  results.appendChild(userElem);
  results.appendChild(compElem);

  // results.innerHTML += countdownDisplay;

  countdown('start');
};

let next = () => {
  showElement('gameplay', true);
  showElement('results', false);
};

let showGameResults = (gameWinner) => {
  let results = document.getElementById('results');

  removeChildren('results');

  showElement('gameplay', false);

  let winnerText = generateWinnerText(gameWinner);
  let userScoreText = generateScoreText('user', game.playerWins);
  let compScoreText = generateScoreText('computer', game.computerWins);

  let winnerElem = createElement('p', winnerText);
  let userScoreElem = createElement('p', userScoreText);
  let compScoreElem = createElement('p', compScoreText);
  let restartButtonElem = createRestartButton();

  results.appendChild(winnerElem);
  results.appendChild(userScoreElem);
  results.appendChild(compScoreElem);
  results.appendChild(restartButtonElem);

  restartButtonElem.addEventListener('click', function () {
    game.rounds = [];
    game.playerWins = 0;
    game.computerWins = 0;
    showElement('gameplay', true);
    showElement('results', false);
  });
};

let countdown = (option) => {
  let countdownText = document.getElementById('countdownText');

  let secs = 3;

  let countdownFunc = () => {
    if (countdownText.textContent === '0') {
      clearInterval(countdownInt);
      next();
    } else {
      secs--;
      countdownText.textContent = secs + '';
    }
  };

  let countdownInt = setInterval(countdownFunc, 3000);
};

loadGame();
