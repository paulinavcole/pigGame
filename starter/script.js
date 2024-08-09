'use strict';
// Selecting elements
// will be used to identify active current player to change css properties
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// need hash because you are selecting by id. the . is only for classes.
const score0El = document.querySelector('#score--0');
// can also use get element by id and then you dont need the hash. can be faster.
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// logic to switch player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generate a random dice roll. not a global variable bc we want it to reset every time.
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceEl.classList.remove('hidden');
    // can update src property of element directly using template literal which updates the number file to use
    diceEl.src = `dice-${dice}.png`;

    // 3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // selects score dynamically. build id
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. check if players score is >= 100
    // Finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      // remember query select needs to have an actual query so make sure if it's a class you specify the .
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

const resetGame = () => {
  currentScore = 0;
  scores = [0, 0];
  // 1. set players scores to 0
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  // 2 reset player winner
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  diceEl.classList.remove('hidden');
  playing = true;
  console.log(scores);
};

btnNew.addEventListener('click', resetGame);
