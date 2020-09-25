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

let nextCountdownInterval;

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

  document.getElementById('next-button').addEventListener('click', () => {
    nextRound();
  });
};

let startGame = () => {
  let noOfRoundsValue = document.getElementById('noOfRoundsInput').value;
  console.log(noOfRoundsValue);
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
  console.log('started round');

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

  let winnerText = generateWinnerText(roundWinner);
  let userText = generatePickText('You', userPick);
  let compText = generatePickText('Computer', compPick);

  let winnerElem = createElement('h3', winnerText);
  let userElem = createElement('p', userText);
  let compElem = createElement('p', compText);

  results.appendChild(winnerElem);
  results.appendChild(userElem);
  results.appendChild(compElem);

  startNextCountdownInterval();
};

let showGameResults = (gameWinner) => {
  console.log('called show game results');

  showElement('results', true);

  let results = document.getElementById('roundResults');

  removeChildren('roundResults');

  showElement('gameplay', false);
  showElement('countdownContainer', false);

  let winnerText = generateWinnerText(gameWinner);
  let userScoreText = generateScoreText('user', game.playerWins);
  let compScoreText = generateScoreText('computer', game.computerWins);

  let winnerElem = createElement('p', winnerText);
  let userScoreElem = createElement('p', userScoreText);
  let compScoreElem = createElement('p', compScoreText);

  results.appendChild(winnerElem);
  results.appendChild(userScoreElem);
  results.appendChild(compScoreElem);

  document.getElementById('restart-button').style.display = 'block';

  restartButtonElem.addEventListener('click', function () {
    game.rounds = [];
    game.playerWins = 0;
    game.computerWins = 0;
    showElement('restart-button', false);
    showElement('gameplay', true);
    showElement('results', false);
    showElement('countdownContainer', true);
  });
};

let restartGame = () => {
  
}

let startNextCountdownInterval = () => {
  let countdownDisplay = document.getElementById('countdownText');

  let secs = 3;

  countdownDisplay.textContent = secs + '';

  function countdownToNext() {
    if (countdownDisplay.textContent === '0') {
      nextRound();
    } else {
      secs--;

      countdownDisplay.textContent = secs + '';
    }
  }

  nextCountdownInterval = setInterval(countdownToNext, 3000);
};

let stopNextCountdownInterval = () => {
  clearInterval(nextCountdownInterval);
  console.log('interval cleared');
};

let nextRound = () => {
  stopNextCountdownInterval();

  if (game.rounds.length === game.roundNo) {
    showGameResults(determineGameWinner(game.playerWins, game.computerWins));
  } else {
    showElement('gameplay', true);

    showElement('results', false);
  }
};

loadGame();
