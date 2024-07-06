'use strict';

// Selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // another way of selecting element with ID
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

const player00 = document.querySelector('.player--0');
const player01 = document.querySelector('.player--1');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Setting players score to Zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  // Setting Current Score displayed to Zero
  current0El.textContent = 0;
  current1El.textContent = 0;
  // Reset the CSS background
  diceEl.classList.add('hidden'); // hide the dice
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player-winner');
  // Remove active player status
  player1El.classList.remove('player--active');
  // Set the 1st Player as Active player
  player0El.classList.add('player--active');
};

// To run the function to execute all the codes.
init();

// Switching player function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // the player hasnt switch yet, so change the score to Zero first
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; // Now only the player switch
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Selecting ALL the buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Rolling dice functionality

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6);
    +1;
    // 2. Display Dice
    if (dice > 0) {
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
    }
    // 3. Switching Player - Check for rolled 1: if not 1, add the score to the current score, if it is one , switch to next player
    if (dice !== 1) {
      currentScore += dice; // currentScore = currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //current0El.textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Hold The Current Score

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100. IF YES, FINISH the game
    if (scores[activePlayer] >= 50) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // IF NOT, SWITCH to next player
      switchPlayer();
    }
  }
});

// Resetting the Game
btnNew.addEventListener('click', init);
