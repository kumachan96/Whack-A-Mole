// console.log(`Hello World 😊 `);

const playButton = document.getElementById("play-btn");
// const pauseButton = document.getElementById("pause-btn");
const mainMenuButton = document.getElementById("main-menu-btn");
const playAgainButton = document.getElementById("play-again-btn");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const GAME_TIME_SECONDS = 10;

playButton.addEventListener("click", startGame);
// pauseButton.addEventListener("click", pauseGame);
playAgainButton.addEventListener("click", playAgain);
mainMenuButton.addEventListener("click", mainMenu);

function show_hide(showPage, hidePage) {
  hidePage.classList.add("hide");
  showPage.classList.remove("hide");
}

var timeout, timeLeft;
timeLeft = document.getElementById("timeleft").innerHTML;

function timerReset(){
  document.getElementById("timeleft").innerHTML = GAME_TIME_SECONDS;
}

function timerDisplay() {
  document.getElementById("timeleft").innerHTML = timeLeft;
}

function timerCountdown() {
  timerDisplay();
  console.log(`timeleft :${timeLeft}`);
  if (timeLeft == 0) {
    timeLeft = GAME_TIME_SECONDS;
    gameOver();
  } else {
    timeLeft--;
    timeout = setTimeout("timerCountdown()", 1000);
  }
}

function startGame() {
  console.log(`Game started`);
  show_hide(gameScreen, mainScreen);
  timerReset();
  startWhack();
  timerCountdown();
}

function gameOver() {
  document.getElementById("game-over-score").innerHTML = score;
  show_hide(gameOverScreen, gameScreen);
}

// function pauseGame() {
//   console.log(`Game paused`);
//   // timerPause();
//   show_hide(gameOverScreen, gameScreen);
// }

function mainMenu() {
  console.log(`Returning to main menu`);
  show_hide(mainScreen, gameOverScreen);
}

function playAgain() {
  console.log(`Pressed play again`);
  show_hide(gameScreen, gameOverScreen);
  startGame();
  // reset score and the timer
}

// implement game
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.getElementById("current-score");
const moles = document.querySelectorAll(".mole");

let lastHole;
let timeUp = false;
let score = 0;

// console.log(`holes : ${holes} scoreBoardd : ${scoreBoard} moles : ${moles}`)

function randomTime(min, max) {
  return Math.round(Math.random() * (min - max) + max);
}

// console.log(randomTime(0,100));

function randomHole(holes) {
  const ids = Math.floor(Math.random() * holes.length);
  const hole = holes[ids];

  if (hole === lastHole) {
    console.log("same last hole");
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

// console.log(randomHole(holes));

function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);

  // console.log(`time : ${time}, hole : ${hole}`);

  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}


function whack(e){
  score++;
  this.parentNode.classList.remove("up");
  // scoreBoard.textContent = score;
  scoreBoard.innerHTML = score;
}

moles.forEach((mole) => mole.addEventListener("click", whack));


function startWhack() {
  // scoreBoard.textContent = 0;
  scoreBoard.innerHTML = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => {
    timeUp = true;
    console.log("game over");
  }, GAME_TIME_SECONDS * 1000);
}