// HTML Components
const playButton = document.getElementById("play-btn");
const mainMenuButton = document.getElementById("main-menu-btn");
const playAgainButton = document.getElementById("play-again-btn");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

// Game Duration
const GAME_TIME_SECONDS = 60;

// Buttons Events
playButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", playAgain);
mainMenuButton.addEventListener("click", mainMenu);

// Renders and Hides coresponding divs
function show_hide(showPage, hidePage) {
  hidePage.classList.add("hide");
  showPage.classList.remove("hide");
}

// Timer and Helper Functions
var timeout, timeLeft;
timeLeft = document.getElementById("timeleft").innerHTML;

function timerReset() {
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

// Starts Timer and Game after Game Screen is Rendered
function startGame() {
  console.log(`Game started`);
  show_hide(gameScreen, mainScreen);
  timerReset();
  WhackAMole();
  timerCountdown();
}

// Updates Score and then renders Game Over Screen
function gameOver() {
  document.getElementById("game-over-score").innerHTML = score;
  show_hide(gameOverScreen, gameScreen);
}

// Main Menu Button Function in Game Over Screen
function mainMenu() {
  console.log(`Returning to main menu`);
  show_hide(mainScreen, gameOverScreen);
}

// Play Again Button Function in Game Over Screen
function playAgain() {
  console.log(`Pressed play again`);
  show_hide(gameScreen, gameOverScreen);
  startGame();                           // resets score and the timer inside
}

// Whack-A-Mole Game and related functions

// HTML Components
const positions = document.querySelectorAll(".pos");
const currentScore = document.getElementById("current-score");
const circles = document.querySelectorAll(".circle");

let lastPos;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (min - max) + max);
}

// Generates Random Postion for the circle to spawn without spawing the same circle twice within 1 second.
function randomPos(positions) {
  const ids = Math.floor(Math.random() * positions.length);
  const pos = positions[ids];

  if (pos === lastPos) {
    console.log(`Repeated Position`);
    return randomPos(positions);
  }

  lastPos = pos;
  return pos;
}

//  Spawns Circles randomly using randomPos() and randomTime()
//  by adding a class up with related CSS properties in an interval using setTimeout()
//  This works recursively till the time is up.
function spawnCircle() {
  const minTime = (GAME_TIME_SECONDS / 2) * 10; // 300
  const maxTime = GAME_TIME_SECONDS * 3 * 10;   // 1800
  const time = randomTime(minTime, maxTime);
  const pos = randomPos(positions);

  pos.classList.add("up");

  setTimeout(() => {
    pos.classList.remove("up");
    if (!timeUp) spawnCircle();
  }, time);
}

// Function when the circle is clicked, making it disappear by removing up CSS class and increasing score
function whack(e) {
  score++;
  this.parentNode.classList.remove("up");
  currentScore.innerHTML = score;
}

// Adding event listeners for all circles
circles.forEach((circle) => circle.addEventListener("click", whack));

// Starts Whack-A-Mole by resetting scores and spawing circles till the time is up
function WhackAMole() {
  currentScore.innerHTML = 0;
  timeUp = false;
  score = 0;
  spawnCircle();
  setTimeout(() => {
    timeUp = true;
    console.log("game over");
  }, GAME_TIME_SECONDS * 1000);
}
