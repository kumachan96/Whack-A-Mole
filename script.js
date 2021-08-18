// console.log(`Hello World 😊 `);

const playButton = document.getElementById("play-btn");
const pauseButton = document.getElementById("pause-btn");
const mainMenuButton = document.getElementById("main-menu-btn");
const playAgainButton = document.getElementById("play-again-btn");
const mainScreen = document.getElementById("main-screen");
const gameScreen = document.getElementById("game-screen");
const gameOverScreen = document.getElementById("game-over-screen");

playButton.addEventListener("click", startGame);
pauseButton.addEventListener("click", pauseGame);
playAgainButton.addEventListener("click", playAgain);
mainMenuButton.addEventListener("click", mainMenu);

function show_hide(showPage, hidePage) {
  hidePage.classList.add("hide");
  showPage.classList.remove("hide");
}

function startGame() {
  console.log(`Game started`);
  show_hide(gameScreen, mainScreen);
}

function pauseGame() {
  console.log(`Game paused`);
  show_hide(gameOverScreen, gameScreen);
}

function mainMenu() {
  console.log(`Returning to main menu`);
  show_hide(mainScreen, gameOverScreen);
}

function playAgain() {
  console.log(`Pressed play again`);
  show_hide(gameOverScreen, gameScreen);
  // reset score and the timer
}
