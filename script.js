// console.log(`Hello World 😊 `);

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const mainMenuButton = document.getElementById("main-menu-btn");
const playAgainButton = document.getElementById("play-again-btn");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

const GAME_TIME_SECONDS = 10;

playButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);
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
  timerCountdown();
}

function gameOver() {
  show_hide(gameOverScreen, gameScreen);
}

function pauseGame() {
  console.log(`Game paused`);
  // timerPause();
  show_hide(gameOverScreen, gameScreen);
}

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
