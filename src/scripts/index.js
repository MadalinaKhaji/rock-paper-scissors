const Game = require('./models/game.model');

const Round = require('./models/round.model');

const {
  getComputerPick,
  getRoundWinner,
  determineGameWinner,
  createElement,
  showElement,
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

  document.getElementById('rock-button').addEventListener('click', () => {
    startRound('rock');
  });

  document.getElementById('paper-button').addEventListener('click', () => {
    startRound('paper');
  });

  document.getElementById('scissors-button').addEventListener('click', () => {
    startRound('scissors');
  });

  document.getElementById('next-button').addEventListener('click', () => {
    nextRound();
  });

  document.getElementById('restart-button').addEventListener('click', () => {
    restartGame();
  });
};

let startGame = () => {
  let noOfRoundsValue = document.getElementById('noOfRoundsInput').value;
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

  let winnerElem = createElement('h4', winnerText);
  let userElem = createElement('p', userText);
  let compElem = createElement('p', compText);

  results.appendChild(winnerElem);
  results.appendChild(userElem);
  results.appendChild(compElem);

  startNextCountdownInterval();
};

let showGameResults = (gameWinner) => {
  let results = document.getElementById('roundResults');

  removeChildren('roundResults');

  showElement('countdownContainer', false);

  showElement('restart-button', true);

  let winnerText = `Game Results: ${generateWinnerText(gameWinner)}`;
  let userScoreText = generateScoreText('User', game.playerWins);
  let compScoreText = generateScoreText('Computer', game.computerWins);

  let winnerElem = createElement('h4', winnerText);
  let userScoreElem = createElement('p', userScoreText);
  let compScoreElem = createElement('p', compScoreText);

  results.appendChild(winnerElem);
  results.appendChild(userScoreElem);
  results.appendChild(compScoreElem);
};

let restartGame = () => {
  game.rounds = [];

  game.playerWins = 0;

  game.computerWins = 0;
  showElement('restart-button', false);

  showElement('gameplay', true);

  showElement('results', false);
  // Must set display to flex instead of block for styling purposes
  document.getElementById('countdownContainer').style.display = 'flex';
};

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
};

let nextRound = () => {
  stopNextCountdownInterval();

  if (game.rounds.length === game.roundNo) {
    showElement('gameplay', false);

    showElement('results', true);

    showGameResults(determineGameWinner(game.playerWins, game.computerWins));
  } else {
    showElement('gameplay', true);

    showElement('results', false);
  }
};

loadGame();
