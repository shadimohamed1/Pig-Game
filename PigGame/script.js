"use strict";
const currScore0El = document.querySelector("#current--0");
const currScore1El = document.querySelector("#current--1");

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

let playing;
let activePlayer;

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let currentScore;
let scores;

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

const switchPlayer = function () {
  //Switches to the other player
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Initialize everything

init();

//Roll Dice
const rollDice = function () {
  if (playing) {
    let roll = Number(Math.trunc(Math.random() * 6) + 1);
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${roll}.png`;
    if (roll !== 1) {
      currentScore += roll;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switches to the other player
      switchPlayer();
    }
  }
};

btnRoll.addEventListener("click", rollDice);

//hold button

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

//Reset game

btnNew.addEventListener("click", init);
